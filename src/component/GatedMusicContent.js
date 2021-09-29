import { useEffect, useState, useRef } from 'react'
import { useSelector } from "react-redux";
import { Inflow } from "../inflow-solidity-sdk/src/Inflow";
import { Contract, ethers } from 'ethers'
import SocialToken from "../artifacts/contracts/token/social/SocialToken.sol/SocialToken.json";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import AudioStreamer from './AudioStreamer';
import SmallLoader from './SmallLoader';
import axios from 'axios'
import { Magic } from "magic-sdk";

const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY_RINKEBY, {
    network: "rinkeby",
  });

const GatedMusicContent = (props) => {

    const MySwal = withReactContent(Swal);
    const [provider, setProvider] = useState();
    const [socialTokenAddress, setSocialTokenAddress] = useState('');
    const [availableBalance, setAvailableBalance] = useState(null);
    const [requiredBalance, setRequiredBalance] = useState(null);
    const [sufficientBalance, setSufficientBalance] = useState(false);
    const [insufficientBalance, setInsuffucientBalance] = useState(false);
    const [connectedWallet, setConnectedWallet] = useState(false)
    const [viewable, setViewable] = useState(false);
    const renderCount = useRef(0);
    const [setAudioFile, AudioFile] = useState('');

    useEffect(async () => {

        const isLoggedIn = await magic.user.isLoggedIn();
        
        if(isLoggedIn) {
            const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
            setProvider(provider);
            setConnectedWallet(true);

            await axios.get(`${process.env.REACT_APP_SERVER_URL}/v1/artist/streammp3/${props.match.params.trackId}`)
            .then((res) => {
                console.log(res);
                setAudioFile(res);
            })
            .catch((err) => {
                console.log(err);
            });

        } else {
            setConnectedWallet(false);
        }

        setSocialTokenAddress(props.location.address);
        setRequiredBalance(props.location.requiredBalance); 
    },[])

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    })

    useEffect(() => {
        sufficientBalance &&
          MySwal.fire({
            title: <p style={{ color: "white" }}>Access Granted!</p>,
            icon: "success",
            customClass: {
              confirmButton: "btn-gradiant",
            },
            buttonsStyling: false,
            background: "#303030",
          }).then(() => {
            //setViewable(true);
            setSufficientBalance(sufficientBalance => !sufficientBalance)
          });           
    }, [sufficientBalance])

    useEffect(() => {
        insufficientBalance && 
            MySwal.fire({
                title: <p style={{ color: "white" }}>You Need {`${requiredBalance}`} Artist Tokens To View This Content</p>,
                icon: "error",
                customClass: {
                confirmButton: "btn-gradiant",
                },
                buttonsStyling: false,
                background: "#303030",
            }).then(() => {
                setInsuffucientBalance(insufficientBalance => !insufficientBalance)
                window.location.href = "/";
            }); 
    }, [insufficientBalance])
    
    useEffect(async () => {
        if(requiredBalance && viewable === false){
            await getTokenBalance();     
        } 
    });

    useEffect(async () => {
            hasEnoughTokens(); 
    },[availableBalance])


    const getTokenBalance = async () => {
    if (provider) {
        try {
            const signer = provider.getSigner();
            const inflow = new Inflow(provider, 4);
            const signerAddress = await signer.getAddress();
            let userBalance = await inflow.balanceOf(
                "SocialToken",
                signerAddress,
                socialTokenAddress
                    );
            userBalance = parseFloat(userBalance[0]);
            setAvailableBalance(userBalance);
            console.log({ availableBalance }); 
        } catch (err) {
            console.log(err);
            }
        }
    };

    const hasEnoughTokens = () => {
        if(availableBalance !== null && availableBalance >= requiredBalance){
            setSufficientBalance(true);
        } else if (availableBalance !== null && availableBalance < requiredBalance) {
            setInsuffucientBalance(true);
        }
    }
                
    return (
        <div className="dashboard-wrapper-main">
            {viewable ? 
            <audio></audio>
            : <div className="card-heading">
            <SmallLoader />
            <div className="dashboard-wrapper-main">
            <div>checking your balance</div>
            </div>
            </div>}
        </div>
    )
}

export default GatedMusicContent
