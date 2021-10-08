/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import './component.css';
import './Artist.css';
import { assetsImages } from '../constants/images';
import { Modal } from 'react-bootstrap';
import Loader from './Loader';
import SmallLoader from './SmallLoader';
import { Inflow } from '../inflow-solidity-sdk/src/Inflow';
import { Contract, ethers } from 'ethers';
import SocialToken from '../artifacts/contracts/token/social/SocialToken.sol/SocialToken.json';
import usdc from '../artifacts/contracts/token/erc20/usdc.json';
import { useParams, useHistory } from 'react-router-dom';
import Axios from 'axios';
import { Magic } from 'magic-sdk';
import { POLYGON_USDC } from '../utils/addresses';
import { useSelector } from 'react-redux';
import ArtistTransact from './ArtistTransact';
import ArtistHeader from './ArtistHeader';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const customNodeOptions = {
    rpcUrl: 'https://rpc-mainnet.maticvigil.com/', // Polygon RPC URL
    chainId: 137 // Polygon chain id
};

const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY, {
    network: customNodeOptions
});

let errcode = '';

const Artist = () => {
    const history = useHistory();
    const MySwal = withReactContent(Swal);
    const token = useSelector((state) => state.auth.token);
    const uid = useSelector((state) => state.auth.data._id);
    const isArtist = useSelector((state) => state.auth.isArtist);
    const isFan = useSelector((state) => state.auth.isFan);

    const { id } = useParams();
    const [artist, setArtist] = useState({});
    const [profileModel, setprofileModel] = useState(false);
    const [sell, setsell] = useState(false);
    const [buy, setbuy] = useState(false);
    const [MintPrice, setMintPrice] = useState('');
    const [provider, setProvider] = useState();
    const [TokensToMint, setTokensToMint] = useState(0);
    const [TokensToBurn, setTokensToBurn] = useState(0);
    const [balance, setBalance] = useState('');
    const [loading, setLoading] = useState(false);
    const [successmint, setsuccessmint] = useState(false);
    const [successburn, setsuccessburn] = useState(false);
    const [failuremint, setfailuremint] = useState(false);
    const [failureburn, setfailureburn] = useState(false);
    const [lessusdc, setlessusdc] = useState(false);
    const [connectedwallet, setconnectedwallet] = useState(true);
    const [socialTokenAddress, setSocialTokenAddress] = useState('');
    const [sellflag, setsellflag] = useState(false);
    const [buyflag, setbuyflag] = useState(false);
    const [totalMintPrice, setTotalMintPrice] = useState(0.0);
    const [totalburnprice, settotalburnprice] = useState(0.0);
    const [buymodalloading, setbuymodalloading] = useState(false);
    const [sellmodalloading, setsellmodalloading] = useState(false);
    const [insufficenttokens, setinsufficenttokens] = useState(false);
    const [historicalData, setHistoricalData] = useState([]);
    const [playlistID, setPlaylistID] = useState();
    const [inflowGatedUrl, setInflowGatedUrl] = useState('');
    const [requiredBalance, setRequiredBalance] = useState();
    const [encodedUrl, setEncodedUrl] = useState('');
    const [notMinted, setNotMinted] = useState(false);
    const [connectedWallet, setConnectedWallet] = useState();
    const [artistTokenSymbol, setArtistTokenSymbol] = useState('');
    const [processing, setProcessing] = useState(false);

    const [mp3Url, setMp3Url] = useState('');
    const [mp3RequiredBalance, setMp3RequiredBalance] = useState();
    const [mp3Id, setMp3Id] = useState('');

    useEffect(async () => {
        await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/getbyid`, {
            id
        }).then(async (response) => {
            console.log({ response} )
            setArtist(response.data.artist);
            setSocialTokenAddress(response.data.artist.social_token_id);
            setArtistTokenSymbol(response.data.artist.social_token_symbol);
            setHistoricalData(response.data.artist.mint_price_history);
            if (response.data.artist.soundcloud_playlist_id) {
                console.log('HAS SOUNDCLOUD ID')
                console.log(response.data.artist.soundcloud_playlist_id)
                setPlaylistID(response.data.artist.soundcloud_playlist_id);
            } 
            if (response.data.artist.inflowgated_urls) {
                setEncodedUrl(response.data.artist.inflowgated_urls[0].encodedOrignalUrl);
                setInflowGatedUrl(response.data.artist.inflowgated_urls[0].randomString);
                setRequiredBalance(response.data.artist.inflowgated_urls[0].balance);
                
            }
            if (response.data.artist.mp3s[0]) {
                console.log('HAS MP3s', response.data.artist.mp3s[0])
                setMp3Url(response.data.artist.mp3s[0].url);
                setMp3RequiredBalance(response.data.artist.mp3s[0].balance);
                setMp3Id(response.data.artist.mp3s[0]._id);
                console.log({ mp3Id });
            }
            
        setLoading(false);
        }).catch((error) => {
            console.log(error)
        })

        const isLoggedIn = await magic.user.isLoggedIn();
        if(isLoggedIn) {
            const magicLinkProvider = new ethers.providers.Web3Provider(magic.rpcProvider);
            setProvider(magicLinkProvider);
            setConnectedWallet(true);
        }    

        // const tokenPrice = setInterval(() => {
        //     fetchTokenPrice();
        // }, 10000);
        // return () => {
        //     clearInterval(tokenPrice);
        // };

    }, []);

    useEffect(async () => {
        console.log({ provider });
        await fetchTokenPrice();
        await getUserBalance();
    },[provider])

    useEffect(() => {
        notMinted &&
            MySwal.fire({
                title: <p style={{ color: 'white' }}>Artist Social Token Is Being Minted</p>,
                icon: 'info',
                html: <span style={{ color: 'white' }}>please come back later</span>,
                customClass: {
                    confirmButton: 'btn-gradiant'
                },
                buttonsStyling: false,
                background: '#303030'
            }).then(() => {
                setNotMinted((notMinted) => !notMinted);
                window.location.href = '/';
            });
    }, [notMinted]);

    useEffect(() => {
        !connectedwallet &&
            MySwal.fire({
                title: <p style={{ color: 'white' }}>Please Login</p>,
                icon: 'warning',
                confirmButtonText: 'Login',
                customClass: {
                    confirmButton: 'btn-gradiant'
                },
                buttonsStyling: false,
                background: '#303030'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('need to implement magiclink login');
                    // setconnectedwallet((connectedwallet) => !connectedwallet);
                }
            });
    }, [connectedwallet]);

    useEffect(() => {
        lessusdc &&
            MySwal.fire({
                title: <p style={{ color: 'white' }}>Transaction Denied</p>,
                icon: 'error',
                html: <span style={{ color: 'white' }}>Insufficient USDC Balance</span>,
                customClass: {
                    confirmButton: 'btn-gradiant'
                },
                buttonsStyling: false,
                background: '#303030'
            }).then(() => {
                setlessusdc((lessusdc) => !lessusdc);
            });
    }, [lessusdc]);
    useEffect(() => {
        insufficenttokens &&
            MySwal.fire({
                title: <p style={{ color: 'white' }}>Insufficient Tokens To Sell</p>,
                icon: 'error',
                customClass: {
                    confirmButton: 'btn-gradiant'
                },
                buttonsStyling: false,
                background: '#303030'
            }).then(() => {
                setinsufficenttokens((insufficenttokens) => !insufficenttokens);
            });
    }, [insufficenttokens]);
    useEffect(() => {
        failureburn &&
            MySwal.fire({
                title: <p style={{ color: 'white' }}>Transaction Denied</p>,
                icon: 'error',
                html: <span style={{ color: 'white' }}>Error selling tokens</span>,
                customClass: {
                    confirmButton: 'btn-gradiant'
                },
                buttonsStyling: false,
                background: '#303030'
            }).then(() => {
                setfailureburn((failureburn) => !failureburn);
            });
    }, [failureburn]);
    useEffect(() => {
        successburn &&
            MySwal.fire({
                title: <p style={{ color: 'white' }}>Transaction Successfull</p>,
                icon: 'success',
                customClass: {
                    confirmButton: 'btn-gradiant'
                },
                buttonsStyling: false,
                background: '#303030'
            }).then(() => {
                setsuccessburn((successburn) => !successburn);
            });
    }, [successburn]);
    useEffect(() => {
        failuremint &&
            MySwal.fire({
                title: <p style={{ color: 'white' }}>Transaction Denied</p>,
                icon: 'error',
                html: <span style={{ color: 'white' }}>Error buying tokens</span>,
                customClass: {
                    confirmButton: 'btn-gradiant'
                },
                buttonsStyling: false,
                background: '#303030'
            }).then(() => {
                setfailuremint((failuremint) => !failuremint);
            });
    }, [failuremint]);
    useEffect(() => {
        successmint &&
            MySwal.fire({
                title: <p style={{ color: 'white' }}>Transaction Successful</p>,
                icon: 'success',
                customClass: {
                    confirmButton: 'btn-gradiant'
                },
                buttonsStyling: false,
                background: '#303030'
            }).then(() => {
                setsuccessmint((successmint) => !successmint);
            });
    }, [successmint]);

    const fetchTokenPrice = async () => {
        console.log('fetchTokenPrice fired')
        try {
            const inflow = new Inflow(provider, 137);
            const mintPrice = await inflow.getMintPriceSocial(
                socialTokenAddress,
                inflow.parseERC20('SocialToken', '1')
            );
            setMintPrice(mintPrice[0]);
            console.log({ mintPrice });
        } catch (err) {
            console.log('fetch Token Price error : ', err)
        }
    };

    const getUserBalance = async () => {
        if(provider){
            const signer = provider.getSigner();
            const inflow = new Inflow(provider, 137);
            const signerAddress = await signer.getAddress();
            const userBalance = await inflow.balanceOf(
                'SocialToken',
                signerAddress,
                socialTokenAddress
            );
            setBalance(userBalance[0]);

            //if balance is zero, remove token address from user record in DB
            if (balance === undefined || balance === '0.0') {
                await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/selltoken`, {
                    socialTokenAddress,
                    uid
                })
                    .then((resp) => {
                        console.log(resp.data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                console.log('reduced user token balance from DB successfully');
            }
        }
    };

    const buyTokens = async () => {
        if (!connectedWallet) {
            alert('Please log in');
            return;
        } else if (connectedWallet) {
            try {
                const signer = provider.getSigner();
                const socialMinter = new Contract(socialTokenAddress, SocialToken.abi, signer);

                const usdcMinter = new Contract(POLYGON_USDC, usdc, signer);

                //get USDC balance
                const inflow = new Inflow(provider, 137);
                setbuymodalloading(true);
                const signerAddress = await signer.getAddress();
                const usdcBalance = await inflow.balanceOf('USDC', signerAddress);
                console.log('usdc Balance', usdcBalance);

                await fetchTokenPrice();

                if (parseFloat(usdcBalance[0]) < parseFloat(totalMintPrice)) {
                    console.log('HELLO');
                    setLoading(false);
                    setlessusdc((lessusdc) => !lessusdc);
                    return;
                }
                const allowance = await inflow.allowance(
                    'SocialToken',
                    signerAddress,
                    socialTokenAddress,
                    socialTokenAddress
                );
                console.log({ allowance });
                if (parseFloat(allowance) >= parseFloat(totalMintPrice)) {
                    console.log('ALLOWANCE GREATER SO MINTING DIRECTLY');
                    await (
                        await socialMinter.mint(
                            inflow.parseERC20('SocialToken', String(TokensToMint))
                        )
                    ).wait();
                    setLoading(false);
                    setsuccessmint((successmint) => !successmint);
                    await updateDb();
                    setInterval(() => {
                        // window.location.reload();
                        history.go(0);
                    }, 2000);
                    return;
                }
                const mintPrice = await socialMinter.getMintPrice(
                    inflow.parseERC20('SocialToken', String(TokensToMint))
                );
                console.log('ALLOWANCE LESS SO GETTING APPROVAL');
                await (await usdcMinter.approve(socialMinter.address, mintPrice)).wait();
                await (
                    await socialMinter.mint(inflow.parseERC20('SocialToken', String(TokensToMint)))
                ).wait();
                console.log('MINT SUCCESSFULL');
                console.log('ARTIST SYMBOL', artist.social_token_symbol);
                setbuymodalloading(false);
                setsuccessmint((successmint) => !successmint);
                setbuy(false);

                await updateDb();

                await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/buytoken`, {
                    socialTokenAddress,
                    uid,
                    symbol: artistTokenSymbol,
                    mintPrice: MintPrice
                })
                .then((resp) => {
                    console.log(resp.data);
                })
                .catch((err) => {
                    console.error(err);
                });

                await updatePriceHistory();
                await updateArtistFeesEarned();
                setInterval(() => {
                    window.location.reload();
                }, 2000);
            } catch (err) {
                setbuymodalloading(false);
                setfailuremint((failuremint) => !failuremint);
                setbuy(false);
                console.log(err);
            }
        } else {
            setconnectedwallet(false);
        }
    };

    const burn = async (social, amount) => {
        const burnPrice = await social.getBurnPrice(amount);
        await (await social.burn(amount)).wait();
        return burnPrice;
    };

    const sellTokens = async () => {
        if (provider) {
            try {
                setsellmodalloading(true);
                setProcessing(true);

                const signer = provider.getSigner();
                const socialMinter = new Contract(socialTokenAddress, SocialToken.abi, signer);

                const inflow = new Inflow(provider, 137);
                const signerAddress = await signer.getAddress();
                const balance = await inflow.balanceOf(
                    'SocialToken',
                    signerAddress,
                    socialTokenAddress
                );

                if (balance[0] < TokensToBurn) {
                    setinsufficenttokens(true);
                }
                await burn(socialMinter, inflow.parseERC20('SocialToken', String(TokensToBurn)));

                setBalance(balance[0]);

                //check user balance, if zero, remove tokenAddress from DB
                getUserBalance();

                setsellmodalloading(false);
                setsuccessburn((successburn) => !successburn);
                setsell(false);
                await updatePriceHistory();
                // getBalance();
            } catch (err) {
                setsellmodalloading(false);
                // setProcessing(false);
                setfailureburn((failureburn) => !failureburn);
                setsell(false);
                // // console.log(err);
            }
        } else {
            setconnectedwallet(false);
        }
    };

    const fetchtotalburnprice = async () => {
        if (provider) {
            try {
                setsellmodalloading(true);
                // await requestAccount();
                // const provider = new ethers.providers.Web3Provider(
                //     window.ethereum
                // );
                const inflow = new Inflow(provider, 137);
                const burnPrice = await inflow.getBurnPriceSocial(
                    socialTokenAddress,
                    inflow.parseERC20('SocialToken', String(TokensToBurn))
                );
                settotalburnprice(burnPrice[0]);
                // // console.log(`BURN PRICE: ${burnPrice[0]}`);
                setsellmodalloading(false);
                setsellflag(true);
            } catch (err) {
                setsellmodalloading(false);
                // // console.log(err);
            }
        }
    };

    const updateDb = async () => {
        if (isFan) {
            await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/buytoken`, {
                socialTokenAddress,
                uid,
                symbol: artistTokenSymbol
            })
                .then((resp) => {
                    console.log(resp.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        } else if (isArtist) {
            await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/buytoken`, {
                socialTokenAddress,
                uid,
                symbol: artistTokenSymbol
            })
                .then((resp) => {
                    console.log(resp.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const updateArtistFeesEarned = async () => {
        try {
            await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/updatefeesearned`, {
                social_token_id: socialTokenAddress,
                total_mint_price: totalMintPrice
            })
                .then((resp) => {
                    console.log(resp.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (error) {}
    };

    const fetchtotalMintPrice = async () => {
        if (provider) {
            try {
                setbuymodalloading(true);
                // // console.log({ socialTokenAddress })
                // await requestAccount();
                const inflow = new Inflow(provider, 137);
                const mintPrice = await inflow.getMintPriceSocial(
                    socialTokenAddress,
                    inflow.parseERC20('SocialToken', String(TokensToMint))
                );
                setTotalMintPrice(mintPrice[0]);
                setbuymodalloading(false);
                setbuyflag(true);
                // // console.log(`MINT PRICE: ${mintPrice[0]}`);
            } catch (err) {
                setbuymodalloading(false);
                // // console.log(err);
            }
        }
    };

    const updatePriceHistory = async () => {
        await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/tokentx`, {
            mint_price_history: {
                price: MintPrice,
                timestamp: Date.now()
            },
            socialTokenAddress,
            first_name: artist.first_name,
            last_name: artist.last_name,
            social_token_id: artist.social_token_id
        });
    };

    

    return (
        <>
            {artist ? (
                <div className="artist-background">
                    <ArtistHeader
                        artist={artist}
                        requiredBalance={requiredBalance}
                        inflowGatedUrl={inflowGatedUrl}
                        socialTokenAddress={socialTokenAddress}
                        encodedUrl={encodedUrl}
                        mp3Url={mp3Url}
                        mp3Id={mp3Id}
                        mp3RequiredBalance={mp3RequiredBalance}
                    />
                    <div className="dashboard-wrapper-main artist-main-wrapper">
                        <ArtistTransact
                            artist={artist}
                            MintPrice={MintPrice}
                            historicalData={historicalData}
                            token={token}
                            provider={provider}
                            setsell={setsell}
                            setbuy={setbuy}
                            setconnectedwallet={setconnectedwallet}
                            balance={balance}
                        />

                        <div className="poll-play-song-details">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="poll-details">
                                        {playlistID ? 
                                            <iframe
                                            width="100%"
                                            height="100%"
                                            scrolling="no"
                                            frameBorder="no"
                                            allow="autoplay"
                                            src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${playlistID}&color=%237d2add&auto_play=false&visual=true`}
                                        ></iframe>
                                        : null}
                                        
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="song-play-list">
                                        <div className="playlist-header">
                                            <span className="like">
                                                <img alt="" src={assetsImages.like} />
                                                557
                                            </span>
                                            <button className="limited-song-btn">
                                                <img alt="" src={assetsImages.verifed} />
                                                Limited
                                            </button>
                                        </div>

                                        <div className="playlist-details">
                                            <div className="playlist-price">
                                            </div>
                                                <img
                                                    alt=""
                                                    width="400"
                                                    src={
                                                        artist.profile_image
                                                            ? `${process.env.REACT_APP_SERVER_URL}/${artist.profile_image}`
                                                            : null
                                                    }
                                                />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* -----------My-NFTs----------------------- */}

                        {/* <div className="mynfts-row-main">
                    <div className="second-col">
                        <Mynftdropdown />
                    </div>
                    <div className="center-col">
                        <input placeholder="Search for an NFT..." />
                    </div>
                    <div className="last-icon">
                        <a href="#">
                            <img alt="" src={assetsImages.filter} />
                        </a>
                    </div>
                </div>
                <div className="songs-grid-main">
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                    <Song />
                </div> */}
                    </div>

                    <Modal
                        show={profileModel}
                        className="edit-profile-modal"
                        onHide={() => setprofileModel((profileModel) => !profileModel)}
                    >
                        <Modal.Header closeButton>
                            <span className="title">Edit Profile</span>
                        </Modal.Header>

                        <Modal.Body>
                            <div className="form-group">
                                <label>Name</label>
                                <input className="form-control" type="text" placeholder="" />
                            </div>

                            <div className="user-profile">
                                <img alt="" src={assetsImages.artist} />
                                <button className="upload-profile btn-gradiant">
                                    Upload New Profile Picture
                                </button>
                            </div>

                            <div className="user-profile-background">
                                <img alt="" src={assetsImages.artistbg} />
                                <button className="upload-profile-background btn-gradiant">
                                    Upload New Background Picture
                                </button>
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <button className="save-btn btn-gradiant">Save Edits</button>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        show={buy}
                        className="edit-profile-modal sell"
                        onHide={() => setbuy((buy) => !buy)}
                    >
                        <Modal.Header closeButton>
                            <span className="title">Buy {artist.social_token_symbol} Token</span>
                        </Modal.Header>

                        <Modal.Body>
                            {buymodalloading ? (
                                <div className="d-flex justify-content-center align-items-center flex-column">
                                    <SmallLoader />
                                </div>
                            ) : (
                                <>
                                    <div className="form-group">
                                        <label>Number of Tokens</label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            value={TokensToMint}
                                            placeholder=""
                                            onChange={(e) => {
                                                setTokensToMint(e.target.value);
                                                setbuyflag(false);
                                            }}
                                        />
                                    </div>

                                    <div className="buy-total-amount">
                                        {/* Amount you'll spend: ${totalMintPrice} */}
                                        Amount you'll spend : <h5>${MintPrice * TokensToMint}</h5>
                                    </div>
                                </>
                            )}
                            {buymodalloading && buyflag ? (
                                <div className="d-flex justify-content-center align-items-center flex-column">
                                    <p>
                                        Processing Transaction, Please Wait <br></br>
                                        This can sometimes take up to a minute
                                    </p>
                                </div>
                            ) : null}
                        </Modal.Body>

                        <Modal.Footer>
                            <button
                                disabled={buymodalloading}
                                className="save-btn btn-gradiant"
                                onClick={buyflag ? buyTokens : fetchtotalMintPrice}
                            >
                                {buyflag ? 'CONFIRM' : 'BUY'}
                            </button>
                        </Modal.Footer>
                    </Modal>

                    <Modal
                        show={sell}
                        className="edit-profile-modal buy"
                        onHide={() => setsell((sell) => !sell)}
                    >
                        <Modal.Header closeButton>
                            <span className="title">Sell {artist.social_token_symbol} Token</span>
                        </Modal.Header>

                        <Modal.Body>
                            {sellmodalloading ? (
                                <div className="d-flex justify-content-center align-items-center flex-column">
                                    <SmallLoader />
                                </div>
                            ) : (
                                <>
                                    <div className="form-group">
                                        <label>Number of Tokens</label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            value={TokensToBurn}
                                            placeholder=""
                                            onChange={(e) => {
                                                setTokensToBurn(e.target.value);
                                                setsellflag(false);
                                            }}
                                        />
                                    </div>

                                    <div className="buy-total-amount">
                                        Amount you'll earn : <h5>${totalburnprice}</h5>
                                    </div>
                                </>
                            )}
                            {sellmodalloading && sellflag ? (
                                <div className="d-flex justify-content-center align-items-center flex-column">
                                    Processing Transaction Please Wait
                                </div>
                            ) : null}
                        </Modal.Body>

                        <Modal.Footer>
                            <button
                                disabled={sellmodalloading}
                                className="save-btn btn-gradiant"
                                onClick={sellflag ? sellTokens : fetchtotalburnprice}
                            >
                                {sellflag ? 'Sell' : 'Get Selling Price'}
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            ) : null}
        </>
    );
};

export default Artist;
