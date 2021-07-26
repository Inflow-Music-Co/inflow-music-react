import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import { ethers } from 'ethers';
import { getEventData } from '../utils/blockchain';
import { Inflow } from '../inflow-solidity-sdk/src/Inflow';
import SocialTokenFactory from '../artifacts/contracts/token/social/SocialTokenFactory.sol/SocialTokenFactory.json';
import { MOCKUSDC, SOCIAL_TOKEN_FACTORY } from '../utils/addresses'
import { useSelector } from 'react-redux';
import { WalletProviderContext } from '../contexts/walletProviderContext';
import SweetAlert from 'react-bootstrap-sweetalert';

let emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const CreateSocialToken = () => {
    const { walletProvider } = useContext(WalletProviderContext);
    const wallet = useSelector(state => state.wallet);
    const [socialtokenid, setSocialTokenId] = useState('');
    const [TokenName, setTokenName] = useState('');
    const [TokenSymbol, setTokenSymbol] = useState('');
    const [walletaddress, setwalletaddress] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [artistaddress, setartistaddress] = useState('');
    const [city, setcity] = useState('');
    const [country, setcountry] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [pincode, setpincode] = useState('');
    const [profileimage, setprofileimage] = useState();
    const [bannerimage, setbannerimage] = useState();
    const [maxsupply, setmaxsupply] = useState('');
    const [slope, setslope] = useState('');
    const [connectedwallet, setconnectedwallet] = useState(true);
    const [artistcreationsuccess, setartistcreationsuccess] = useState(false);
    const [artistcreationfailure, setartistcreationfailure] = useState(false);
    const [formvalidationerror, setformvalidationerror] = useState(false);
    const [formvalidationerrormsg, setformvalidationerrormsg] = useState('');
    const [existingsocialtoken, setexistingsocialtoken] = useState(false);
    const [artistemailexists, setartistemailexists] = useState(false);

    useEffect(() => {
        if (!wallet.wallet_connected) {
            setconnectedwallet(false);
        }
    }, [])


    const onboardArtist = async () => {
        if (firstname.trim() === '') {
            setformvalidationerrormsg('Please enter first name');
            setformvalidationerror(true);
            return;
        }
        if (artistaddress.trim() === '') {
            setformvalidationerrormsg('Please enter address');
            setformvalidationerror(true);
            return;
        }
        if (city.trim() === '') {
            setformvalidationerrormsg('Please enter city');
            setformvalidationerror(true);
            return;
        }
        if (country.trim() === '') {
            setformvalidationerrormsg('Please enter country');
            setformvalidationerror(true);
            return;
        }
        if (email.trim() === '' || emailregex.test(email) === false) {
            setformvalidationerrormsg('Please enter valid email');
            setformvalidationerror(true);
            return;
        }
        if (phone.trim() === '') {
            setformvalidationerrormsg('Please enter phone number');
            setformvalidationerror(true);
            return;
        }
        if (pincode.trim() === '') {
            setformvalidationerrormsg('Please enter pincode');
            setformvalidationerror(true);
            return;
        }
        if (TokenName.trim() === '') {
            setformvalidationerrormsg('Please enter token name');
            setformvalidationerror(true);
            return;
        }
        if (TokenSymbol.trim() === '') {
            setformvalidationerrormsg('Please enter token symbol');
            setformvalidationerror(true);
            return;
        }
        if (!profileimage) {
            setformvalidationerrormsg('Please provide a profile image');
            setformvalidationerror(true);
            return;
        }
        if (!bannerimage) {
            setformvalidationerrormsg('Please provide a banner image');
            setformvalidationerror(true);
            return;
        }
        if (walletaddress.trim() === '' || walletaddress.length !== 42) {
            setformvalidationerrormsg('Please provide a valid wallet address');
            setformvalidationerror(true);
            return;
        }
        try {
            console.log("HERE")
            const {data} = await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/emailcheck`, {email: email})
            if (!data.userExists) {
                setartistemailexists(true);
                setSocialTokenId('');
                return;
            }
            const { socialTokenAddress, alreadyExisted } = await generateSocialToken();
            
            if (alreadyExisted) {
                setexistingsocialtoken(true)
            }
            if (socialTokenAddress && socialTokenAddress.length) {
                const data = new FormData();
                console.log("HELLO");
                // console.log({ TokenName })
                data.append("first_name", firstname);
                data.append("last_name", lastname);
                data.append("address", artistaddress);
                data.append("city", city);
                data.append("country", country);
                data.append("email", email);
                data.append("phone", phone);
                data.append("pin_code", pincode);
                data.append("wallet_id", walletaddress);
                data.append("social_token_name", TokenName);
                data.append("social_token_symbol", TokenSymbol);
                data.append("social_token_id", socialTokenAddress);
                data.append("profile", profileimage);
                data.append("banner", bannerimage);
                // console.log(process.env.REACT_APP_SERVER_URL)
                await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/onboarding`, data)
                if (!alreadyExisted) {
                    setartistcreationsuccess(artistcreationsuccess => !artistcreationsuccess);
                }
            } else {
                setartistcreationfailure(artistcreationfailure => !artistcreationfailure);
            }
        } catch (error) {
            // console.log(error)
        }

    }



    // async function requestAccount() {
    //     await window.ethereum.request({ method: 'eth_requestAccounts' });
    // }

    const generateSocialToken = async () => {
        try {
            // await requestAccount();
            const provider = walletProvider;
            // console.log({ provider });
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                SOCIAL_TOKEN_FACTORY,
                SocialTokenFactory.abi,
                signer
            );
            // console.log(contract);
            // console.log(signer);
            const signerAddress = await signer.getAddress();
            // console.log(signerAddress);
            const inflow = new Inflow(provider, 80001);
            const socialTokenAddress = await inflow.getTokenSocialFactory(
                walletaddress
            );
            // console.log({ socialTokenAddress });
            if (
                socialTokenAddress &&
                parseInt(socialTokenAddress, 16) !== 0
            ) {
                setSocialTokenId(socialTokenAddress);
                return { socialTokenAddress, alreadyExisted: true }
                // console.log(`SOCIAL TOKEN ADDRESS: ${socialTokenAddress}`);
            } else {
                // console.log('HEERREE');
                const whitelistAddress = await contract.whitelist(
                    signerAddress
                );
                whitelistAddress.wait();
                // console.log('WHITELISTED');
                const socialTokenAddress = await getEventData(
                    contract.create({
                        creator: walletaddress,
                        collateral: MOCKUSDC,
                        maxSupply: ethers.utils.parseEther(String(maxsupply)),
                        slope: ethers.utils.parseEther(String(slope)),
                        name: TokenName.trim(),
                        symbol: TokenSymbol.trim(),
                    }),
                    0
                );
                setSocialTokenId(socialTokenAddress);
                return { socialTokenAddress, alreadyExisted: false }
                // console.log(`SOCIAL TOKEN ADDRESS: ${socialTokenAddress}`);
            }
            // if (
            //     typeof window.ethereum !== 'undefined' &&
            //     TokenName &&
            //     TokenSymbol &&
            //     walletaddress &&
            //     maxsupply &&
            //     slope &&
            //     TokenName.trim() !== '' &&
            //     TokenSymbol.trim() !== '' &&
            //     walletaddress.trim() !== '' &&
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
            //         walletaddress
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
            //                 creator: walletaddress,
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
            // console.log(error);
        }
    };

    return (
        <>
            <div className="dashboard-wrapper-main vw-100 d-flex flex-column justify-content-center align-items-center">
                <div className="heading">ARTIST ONBOARDING</div>
                <div className="tab-settings-main">
                    <nav>
                        <div
                            className="nav nav-tabs nav-fill"
                            id="nav-tab"
                            role="tablist"
                        >
                            <a
                                className="nav-item nav-link active"
                                id="nav-home-tab"
                                data-toggle="tab"
                                href="#nav-home"
                                role="tab"
                                aria-controls="nav-home"
                                aria-selected="true"
                            >
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
                                            onChange={(e) =>
                                                setfirstname(e.target.value)
                                            }
                                            value={firstname}
                                            placeholder="First Name"
                                            id="firstname"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={(e) =>
                                                setlastname(e.target.value)
                                            }
                                            value={lastname}
                                            placeholder="Last Name"
                                            id="lastname"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={(e) =>
                                                setartistaddress(e.target.value)
                                            }
                                            value={artistaddress}
                                            placeholder="Address"
                                            id="artistaddress"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={(e) =>
                                                setcity(e.target.value)
                                            }
                                            value={city}
                                            placeholder="City"
                                            id="city"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={(e) =>
                                                setcountry(e.target.value)
                                            }
                                            value={country}
                                            placeholder="Country"
                                            id="country"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={(e) =>
                                                setemail(e.target.value)
                                            }
                                            value={email}
                                            placeholder="Email"
                                            id="email"
                                            type="email"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={(e) =>
                                                setphone(e.target.value)
                                            }
                                            value={phone}
                                            placeholder="Phone number"
                                            id="phone"
                                            type="number"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={(e) =>
                                                setpincode(e.target.value)
                                            }
                                            value={pincode}
                                            placeholder="Pincode"
                                            id="pincode"
                                            type="number"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={(e) =>
                                                setwalletaddress(e.target.value)
                                            }
                                            value={walletaddress}
                                            placeholder="Artist Wallet Address"
                                            id="address"
                                            required
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={(e) =>
                                                setTokenName(e.target.value)
                                            }
                                            value={TokenName}
                                            placeholder="Social Token Name"
                                            id="tokenName"
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={(e) =>
                                                setTokenSymbol(e.target.value)
                                            }
                                            value={TokenSymbol}
                                            placeholder="Social Token Symbol"
                                            id="tokenSymbol"
                                            type="text"
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={(e) =>
                                                setmaxsupply(e.target.value)
                                            }
                                            value={maxsupply}
                                            placeholder="Max Supply"
                                            id="maxsupply"
                                            type="number"
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        <input
                                            onChange={(e) =>
                                                setslope(e.target.value)
                                            }
                                            value={slope}
                                            placeholder="Slope"
                                            id="slope"
                                            type="number"
                                        />
                                    </div>
                                    <div className="common-grids"></div>
                                    <div className="comman-grids">
                                        Profile Image:
                                        <input
                                            onChange={(e) =>
                                                setprofileimage(e.target.files[0])
                                            }
                                            placeholder="Profile Image"
                                            id="profileimage"
                                            type="file"
                                        />
                                    </div>
                                    <div className="comman-grids">
                                        Banner Image:
                                        <input
                                            onChange={(e) =>
                                                setbannerimage(e.target.files[0])
                                            }
                                            placeholder="Banner Image"
                                            id="bannerimage"
                                            type="file"
                                        />
                                    </div>

                                </div>
                                <div className="save-changes-main">
                                    <Button
                                        variant="primary"
                                        size="lg"
                                        onClick={onboardArtist}
                                    >
                                        ONBOARD ARTIST
                                    </Button>{' '}
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
                title="User with given email doesnt exist"
                style={{ color: '#000' }}
                onConfirm={() => { setartistemailexists(artistemailexists => !artistemailexists) }}
                onCancel={() => { setartistemailexists(artistemailexists => !artistemailexists) }}
            >
            </SweetAlert>
        </>
    );
};

export default CreateSocialToken;
