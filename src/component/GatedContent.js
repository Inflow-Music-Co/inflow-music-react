import { useEffect, useState, useRef } from 'react'
import { useSelector } from "react-redux";
import { Inflow } from "../inflow-solidity-sdk/src/Inflow";
import { Contract, ethers } from 'ethers'
import SocialToken from "../artifacts/contracts/token/social/SocialToken.sol/SocialToken.json";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Streamer from './Streamer'
import SmallLoader from './SmallLoader';

const GatedContent = (props) => {

    const MySwal = withReactContent(Swal);
    const provider = useSelector((state) => state.wallet.provider);
    const [socialTokenAddress, setSocialTokenAddress] = useState('');
    const [availableBalance, setAvailableBalance] = useState(null);
    const [requiredBalance, setRequiredBalance] = useState(null);
    const [sufficientBalance, setSufficientBalance] = useState(false);
    const [insufficientBalance, setInsuffucientBalance] = useState(false);
    const [viewable, setViewable] = useState(false);
    const renderCount = useRef(0);

    useEffect(() => {
        setSocialTokenAddress(props.location.address);
        setRequiredBalance(props.location.requiredBalance); 
    },[])

    useEffect(() => {
        renderCount.current = renderCount.current + 1;
    })

    console.log(renderCount.current);
    console.log({ sufficientBalance });
    console.log({ insufficientBalance });

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
            setViewable(true);
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
            console.log('hasEnoughTokens fired');

            if(availableBalance !== null && availableBalance >= requiredBalance){
                setSufficientBalance(true);
            } else if (availableBalance !== null && availableBalance < requiredBalance) {
                setInsuffucientBalance(true);
            }
        }
                
    return (
        <div className="dashboard-wrapper-main">
            {viewable ? <Streamer encodedUrl={props.location.encodedUrl}/> 
            : <div className="card-heading">
            <SmallLoader />
            <div className="dashboard-wrapper-main">
            <div>checking your balance</div>
            </div>
            </div>}
        </div>
    )
}

export default GatedContent