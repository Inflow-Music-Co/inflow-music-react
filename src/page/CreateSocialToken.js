/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import { ethers } from 'ethers';
import { getEventData } from '../utils/blockchain';
import { Inflow } from '../inflow-solidity-sdk/src/Inflow';
import SocialTokenFactory from '../artifacts/contracts/token/social/SocialTokenFactory.sol/SocialTokenFactory.json';
import { RINKEBY_MOCKUSDC, RINKEBY_SOCIAL_TOKEN_FACTORY } from '../utils/addresses'
import { useSelector, useDispatch } from 'react-redux';
import { WalletProviderContext } from '../contexts/walletProviderContext';
import SweetAlert from 'react-bootstrap-sweetalert';

let emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const CreateSocialToken = () => {

    const { walletProvider } = useContext(WalletProviderContext);
    const wallet = useSelector(state => state.wallet);
    const [artistToken, setArtistToken] = useState('');
    const [socialtokenid, setSocialTokenId] = useState('');
    const [socialTokenAddress, setSocialTokenAddress] = useState('')
    const [connectedwallet, setconnectedwallet] = useState(true);
    const [artistcreationsuccess, setartistcreationsuccess] = useState(false);
    const [artistcreationfailure, setartistcreationfailure] = useState(false);
    const [formvalidationerror, setformvalidationerror] = useState(false);
    const [formvalidationerrormsg, setformvalidationerrormsg] = useState('');
    const [existingsocialtoken, setexistingsocialtoken] = useState(false);
    const [artistemailexists, setartistemailexists] = useState(false);
    const [bannerImage, setBannerImage] = useState('');
    const [profileImage, setProfileImage] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        if (!wallet.wallet_connected) {
            setconnectedwallet(false);
            console.log('wallet is not connected')
        }
    }, [])


    const mintSocialToken = async () => {

        //check form fields are valid 
        if (artistToken.firstName.trim() === '') {
            setformvalidationerrormsg('Please enter first name');
            setformvalidationerror(true);
            return;
        }
        if (artistToken.artistAddress.trim() === '') {
            setformvalidationerrormsg('Please enter address');
            setformvalidationerror(true);
            return;
        }
        if (artistToken.city.trim() === '') {
            setformvalidationerrormsg('Please enter city');
            setformvalidationerror(true);
            return;
        }
        if (artistToken.country.trim() === '') {
            setformvalidationerrormsg('Please enter country');
            setformvalidationerror(true);
            return;
        }
        if (artistToken.email.trim() === '' || emailregex.test(artistToken.email) === false) {
            setformvalidationerrormsg('Please enter valid email');
            setformvalidationerror(true);
            return;
        }
        if (artistToken.phone.trim() === '') {
            setformvalidationerrormsg('Please enter phone number');
            setformvalidationerror(true);
            return;
        }
        if (artistToken.pinCode.trim() === '') {
            setformvalidationerrormsg('Please enter pinCode');
            setformvalidationerror(true);
            return;
        }
        if (artistToken.tokenName.trim() === '') {
            setformvalidationerrormsg('Please enter token name');
            setformvalidationerror(true);
            return;
        }
        if (artistToken.tokenSymbol.trim() === '') {
            setformvalidationerrormsg('Please enter token symbol');
            setformvalidationerror(true);
            return;
        }
        if (!profileImage) {
            setformvalidationerrormsg('Please provide a profile image');
            setformvalidationerror(true);
            return;
        }
        if (!bannerImage) {
            setformvalidationerrormsg('Please provide a banner image');
            setformvalidationerror(true);
            return;
        }
        console.log(artistToken.walletAddress.trim())
        if (artistToken.walletAddress.trim() === '') {
            setformvalidationerrormsg('Please provide a valid wallet address');
            setformvalidationerror(true);
            return;
        }
        try {
            console.log("HERE")

            // artistToken/emailcheck Route doesn't exist on server yet 

            // const {data} = await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artistToken/emailcheck`, {email: email})
            // if (!data.artistTokenExists) {
            //     setartistemailexists(true);
            //     setSocialTokenId('');
            //     return;
            // }

            const { tokenAddress, alreadyExisted } = await generateSocialToken();
            setSocialTokenAddress(tokenAddress)
            
            if (alreadyExisted) {
                setexistingsocialtoken(true)
            }
            
        } catch (error) {
             console.log(error)
        }
    }

    const saveArtist = async () => {

        const formData = new FormData();
        formData.append('address', artistToken.artistAddress);
        formData.append('city', artistToken.city);
        formData.append('country', artistToken.country);
        formData.append('email', artistToken.email);
        formData.append('password', artistToken.password);
        formData.append('first_name', artistToken.firstName);
        formData.append('last_name', artistToken.lastName);
        formData.append('phone', artistToken.phone);
        formData.append('pin_code', artistToken.pinCode);
        formData.append('wallet_id', artistToken.walletAddress);
        formData.append('social_token_id', artistToken.socialTokenAddress)
        formData.append('social_token_symbol', artistToken.tokenSymbol);
        formData.append('banner', bannerImage);
        formData.append('profile', profileImage);

        await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/onboarding`, formData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        
        //deactivated checker
        
        // if (!alreadyExisted) {
        //     setartistcreationsuccess(artistcreationsuccess => !artistcreationsuccess);
        // }else {
        //     setartistcreationfailure(artistcreationfailure => !artistcreationfailure);
        // }
        
    }

    // async function requestAccount() {
    //     await window.ethereum.request({ method: 'eth_requestAccounts' });
    // }

    const generateSocialToken = async () => {
        try {
            // await requestAccount();
            const provider = walletProvider;
            console.log({ provider });
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                RINKEBY_SOCIAL_TOKEN_FACTORY,
                SocialTokenFactory.abi,
                signer
            );
            console.log({ contract });
            console.log({ signer });
            const signerAddress = await signer.getAddress();
            console.log({ signerAddress });
            const inflow = new Inflow(provider, 4);
            console.log(inflow);
            const socialTokenAddress = await inflow.getTokenSocialFactory(
                artistToken.walletAddress
            );
            console.log({ socialTokenAddress });
            if (
                socialTokenAddress &&
                parseInt(socialTokenAddress, 16) !== 0
            ) {
                setSocialTokenId(socialTokenAddress);
                console.log(`SOCIAL TOKEN ADDRESS: ${socialTokenAddress}`);
                return { socialTokenAddress, alreadyExisted: true }
                
            } else {
                console.log('HEERREE');
                const whitelistAddress = await contract.whitelist(
                    signerAddress
                );
                whitelistAddress.wait();
                console.log('WHITELISTED');
                const socialTokenAddress = await getEventData(
                    contract.create({
                        creator : artistToken.walletAddress,
                        collateral: RINKEBY_MOCKUSDC,
                        maxSupply: ethers.utils.parseEther(String(artistToken.maxsupply)),
                        slope: ethers.utils.parseEther(String(artistToken.slope)),
                        name: artistToken.tokenName.trim(),
                        symbol: artistToken.tokenSymbol.trim(),
                    }),
                    0
                );
                setSocialTokenId(socialTokenAddress);
                console.log(`SOCIAL TOKEN ADDRESS: ${socialTokenAddress}`);
                return { socialTokenAddress, alreadyExisted: false }
            }
            // if (
            //     typeof window.ethereum !== 'undefined' &&
            //     TokenName &&
            //     TokenSymbol &&
            //     walletAddress &&
            //     maxsupply &&
            //     slope &&
            //     TokenName.trim() !== '' &&
            //     TokenSymbol.trim() !== '' &&
            //     walletAddress.trim() !== '' &&
            //     maxsupply.trim() !== '' &&
            //     slope.trim() !== ''

            // ) {
            //     setSocialTokenId('');
            //     await requestAccount();
            //     const provider = new ethers.providers.Web3Provider(
            //         window.ethereum
            //     );
            //     // console.log({ provider });
            //     const signer = provider.getSigner();
            //     const contract = new ethers.Contract(
            //         SOCIAL_TOKEN_FACTORY,
            //         SocialTokenFactory.abi,
            //         signer
            //     );
            //     // console.log(contract);
            //     // console.log(signer);
            //     const signerAddress = await signer.getAddress();
            //     // console.log(signerAddress);
            //     const inflow = new Inflow(provider, 80001);
            //     const socialTokenAddress = await inflow.getTokenSocialFactory(
            //         walletAddress
            //     );
            //     // console.log({ socialTokenAddress });
            //     if (
            //         socialTokenAddress &&
            //         parseInt(socialTokenAddress, 16) !== 0
            //     ) {
            //         setSocialTokenId(socialTokenAddress);
            //         // console.log(`SOCIAL TOKEN ADDRESS: ${socialTokenAddress}`);
            //     } else {
            //         // console.log('HEERREE');
            //         const whitelistAddress = await contract.whitelist(
            //             signerAddress
            //         );
            //         whitelistAddress.wait();
            //         // console.log('WHITELISTED');
            //         const socialTokenAddress = await getEventData(
            //             contract.create({
            //                 creator: walletAddress,
            //                 collateral: MOCKUSDC,
            //                 maxSupply: ethers.utils.parseEther(String(maxsupply)),
            //                 slope: ethers.utils.parseEther(String(slope)),
            //                 name: TokenName.trim(),
            //                 symbol: TokenSymbol.trim(),
            //             }),
            //             0
            //         );
            //         setSocialTokenId(socialTokenAddress);
            //         socialtokenaddress = socialTokenAddress;
            //         // console.log(`SOCIAL TOKEN ADDRESS: ${socialTokenAddress}`);
            //     }
            // }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        const { value, name } = event.target;
        setArtistToken({ ...artistToken, [name]: value });
    }

    return (
        <>
            <div className="dashboard-wrapper-main vw-100 d-flex flex-column justify-content-center align-items-center">
                <div className="heading">ARTIST ONBOARDING</div>
                <div className="tab-settings-main">
                    <nav>
                        <div
                            className="nav nav-tabs nav-fill"
                            id="nav-tab"
                            role="tablist">
                            <a
                                className="nav-item nav-link active"
                                id="nav-home-tab"
                                data-toggle="tab"
                                href="#nav-home"
                                role="tab"
                                aria-controls="nav-home"
                                aria-selected="true">
                                Artist Onboarding
                            </a>
                        </div>
                    </nav>
                    <div className="tab-content pt-3" id="nav-tabContent">
                        <div
                            className="tab-pane fade show active"
                            id="nav-home"
                            role="tabpanel"
                            aria-labelledby="nav-home-tab"
                        >
                            <div className="account-setting-form">
                                <div className="grids-main-inputs">
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            value={artistToken.firstName}
                                            placeholder="First Name"
                                            name="firstName"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            value={artistToken.lastName}
                                            placeholder="Last Name"
                                            name="lastName"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            value={artistToken.artistAddress}
                                            placeholder="Address"
                                            name="artistAddress"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            value={artistToken.city}
                                            placeholder="City"
                                            name="city"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            value={artistToken.country}
                                            placeholder="Country"
                                            name="country"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            value={artistToken.email}
                                            placeholder="Email"
                                            name="email"
                                            type="email"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            value={artistToken.password}
                                            placeholder="Password"
                                            name="password"
                                            type="password"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            value={artistToken.phone}
                                            placeholder="Phone number"
                                            name="phone"
                                            type="number"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            value={artistToken.pinCode}
                                            placeholder="pinCode"
                                            name="pinCode"
                                            type="number"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            value={artistToken.walletAddress}
                                            placeholder="Artist Wallet Address"
                                            name="walletAddress"
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            placeholder="Social Token Name"
                                            name="tokenName"
                                            value={artistToken.tokenName}
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            placeholder="Social Token Symbol"
                                            name="tokenSymbol"
                                            value={artistToken.tokenSymbol}
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            placeholder="Max Supply"
                                            value={artistToken.maxSupply}
                                            name="maxsupply"
                                            type="number"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            placeholder="Slope"
                                            value={artistToken.slope}
                                            name="slope"
                                            type="number"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={handleChange}
                                            placeholder="social token address"
                                            value={artistToken.socialTokenAddress}
                                            name="socialTokenAddress"
                                            type="text"
                                        />
                                    </div>
                                    
                                    <div className="comman-grids">
                                        Profile Image:
                                        <input
                                            onChange={(e) => setProfileImage(e.target.files[0])}
                                            placeholder="Profile Image"
                                            name="profile"
                                            type="file"
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        Banner Image:
                                        <input
                                            onChange={(e) => setBannerImage(e.target.files[0])}
                                            placeholder="Banner Image"
                                            name="banner"
                                            type="file"
                                        />
                                    </div>

                                </div>
                                <div className="save-changes-main">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={mintSocialToken}>
                                        MINT ARTIST TOKEN
                                    </Button>{' '}
                                </div>
                                <br></br>
                                <div className="save-changes-main">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={saveArtist}>
                                        ONBOARD ARTIST
                                    </Button>{' '}
                                    <br></br>
                                    
                                </div>
                            </div>
                        </div>
                        <h2 className="p-3 my-3">
                            Social token address is : {socialtokenid}
                        </h2>
                    </div>
                </div>
            </div>
            <SweetAlert
                danger
                show={!connectedwallet}
                title="Please Connect Wallet"
                style={{ color: '#000' }}
                onConfirm={() => { setconnectedwallet(connectedwallet => !connectedwallet) }}
                onCancel={() => { setconnectedwallet(connectedwallet => !connectedwallet) }}
            >
            </SweetAlert>
            <SweetAlert
                success
                show={artistcreationsuccess}
                title="Artist onboarded succesfully"
                style={{ color: '#000' }}
                onConfirm={() => { setartistcreationsuccess(artistcreationsuccess => !artistcreationsuccess) }}
                onCancel={() => { setartistcreationsuccess(artistcreationsuccess => !artistcreationsuccess) }}
            >
            </SweetAlert>
            <SweetAlert
                danger
                show={artistcreationfailure}
                title="Error onboarding artist"
                style={{ color: '#000' }}
                onConfirm={() => { setartistcreationfailure(artistcreationfailure => !artistcreationfailure) }}
                onCancel={() => { setartistcreationfailure(artistcreationfailure => !artistcreationfailure) }}
            >
                Check the wallet address and Try again
            </SweetAlert>
            <SweetAlert
                danger
                show={formvalidationerror}
                title={formvalidationerrormsg}
                style={{ color: '#000' }}
                onConfirm={() => { setformvalidationerror(formvalidationerror => !formvalidationerror) }}
                onCancel={() => { setformvalidationerror(formvalidationerror => !formvalidationerror) }}
            >
            </SweetAlert>
            <SweetAlert
                danger
                show={existingsocialtoken}
                title="Social Token for given wallet already exists"
                style={{ color: '#000' }}
                onConfirm={() => { setexistingsocialtoken(existingsocialtoken => !existingsocialtoken) }}
                onCancel={() => { setexistingsocialtoken(existingsocialtoken => !existingsocialtoken) }}
            >
            </SweetAlert>
            <SweetAlert
                danger
                show={artistemailexists}
                title="artistToken with given email doesnt exist"
                style={{ color: '#000' }}
                onConfirm={() => { setartistemailexists(artistemailexists => !artistemailexists) }}
                onCancel={() => { setartistemailexists(artistemailexists => !artistemailexists) }}
            >
            </SweetAlert>
        </>
    );
};

export default CreateSocialToken;