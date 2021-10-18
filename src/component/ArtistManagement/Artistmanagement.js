import React, { useState, useEffect, useContext, useRef } from 'react';
import '../component.css';
import './Artistmanagement.css';
import { assetsImages } from '../../constants/images';
import Performbar from '../Performbar';
import { useParams } from 'react-router-dom';
import { Contract, ethers } from 'ethers';
import { Modal } from 'react-bootstrap';
import SocialToken from '../../artifacts/contracts/token/social/SocialToken.sol/SocialToken.json';
import { Inflow } from '../../inflow-solidity-sdk/src/Inflow';
import Axios from 'axios';
import SmallLoader from '../SmallLoader';
import { useSelector } from 'react-redux';
import { WalletProviderContext } from '../../contexts/walletProviderContext';
import SweetAlert from 'react-bootstrap-sweetalert';
import Button from '@material-ui/core/Button';
import { Magic } from 'magic-sdk';
import { styled } from '@mui/material/styles';
import CreatePlaylist from './CreatePlaylist';
import UploadSong from './UploadSong';
import NFTCollectionModal from './NFTCollectionModal';

const customNodeOptions = {
    rpcUrl: 'https://rpc-mainnet.maticvigil.com/', // Polygon RPC URL
    chainId: 137 // Polygon chain id
};

const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY, {
    network: customNodeOptions
});

const Input = styled('input')({
    display: 'none'
});

const Artistpic = () => {
    //const { walletProvider } = useContext(WalletProviderContext);
    // const [profileModel, setProfileModel] = useState(false);
    const [walletProvider, setWalletProvider] = useState();
    const [newvote, setnewvote] = useState(false);
    const [connectedWallet, setConnectedWallet] = useState(false);
    const [signer, setSigner] = useState();

    /*MintGate Integration state*/
    const [link, setLink] = useState(false);
    const [songUpload, setSongUpload] = useState(false);
    const [url, setURL] = useState('');
    const [linkTitle, setLinkTitle] = useState('');
    const [tokenAddress, setTokenAddress] = useState('');
    const [balance, setBalance] = useState('');
    const [linkSuccess, setLinkSuccess] = useState(false);

    const [success, setsuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [connectedwallet, setconnectedwallet] = useState(true);
    const uid = useSelector((state) => state.auth.data._id);
    const socialTokenAddress = useSelector((state) => state.auth.data.wallet_id);
    const [artist, setArtist] = useState('');
    const [soundCloudLink, setSoundCloudLink] = useState('');
    const [hasActivated, setHasActivated] = useState();
    const [totalFees, setTotalFees] = useState('');
    const [mp3Link, setMp3Link] = useState('');
    const [NFTCollection, setNFTCollection] = useState(false);
    const [id, setId] = useState('');
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);

    console.log({ socialTokenAddress });

    useEffect(async () => {
        const isLoggedIn = await magic.user.isLoggedIn();

        if (isLoggedIn) {
            const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
            const signer = provider.getSigner();
            setWalletProvider(provider);
            setSigner(signer);
            //dispatch(setProvider(provider));
            setConnectedWallet(true);
            setId(uid);
            const { data } = await Axios.post(
                `${process.env.REACT_APP_SERVER_URL}/v1/artist/getbyid`,
                {
                    id: uid
                }
            );
            console.log(data);
            console.log(data.artist.has_activated);
            setHasActivated(data.artist.has_activated);
            setTotalFees(data.artist.total_fees_earned);
            console.log('total fees', totalFees);
            setLoading(false);
        } else {
            setConnectedWallet(false);
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // await CreateMintgateLink(url, linkTitle, tokenAddress, balance, jwt);
    };

    const saveInflowGatedLink = async (url) => {
        console.log('savedLink!!!!', url);
        await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/updateinflowgatedurls`, {
            inflowGatedUrl: url,
            balance
        });
    };

    const changeOwner = async () => {
        const id = uid;

        console.log({ signer });
        const socialToken = new Contract(socialTokenAddress, SocialToken.abi, signer);

        try {
            const transaction = await socialToken.transferOwnership(
                '0x76aB04F8Adb222C7Bbc27991A82498906954dEae'
            );
            transaction.wait();
            Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/activatetrue`, {
                id
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const uploadSoundCloudLink = async () => {
        setsuccess((success) => !success);

        if (soundCloudLink) {
            await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/uploadsoundcloud`, {
                soundcloud_embed: soundCloudLink,
                id: uid
            })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert('please add a soundcloud embed link');
        }
    };

    return (
        <div className="dashboard-wrapper-main artist-management">
            <div className="heading">artist management</div>
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    <div className="card">
                        <div className="artist-title">
                            <div className="d-flex flex-row justify-content-between w-100">
                                <span>Fees Earned </span>
                            </div>
                        </div>
                        {totalFees ? <span>{`$${totalFees}`}</span> : null}
                        <div className="artist-poll">
                            <div className="dropdown"></div>
                            <div
                                className="amount d-flex justify-content-center align-items-center text-wrap"
                                style={{ wordWrap: 'break-word' }}
                            >
                                {loading ? <SmallLoader /> : null}
                            </div>
                        </div>
                        <div className="first-row-main-dash">
                            <div className="left-col">
                                <div className="below-row">
                                    {socialTokenAddress ? (
                                        <>
                                            {hasActivated ? (
                                                <Button
                                                    variant="disabled"
                                                    style={{
                                                        height: '100px',
                                                        width: '100px',
                                                        color: 'grey'
                                                    }}
                                                >
                                                    TOKEN LAUNCHED
                                                </Button>
                                            ) : (
                                                <button
                                                    className="btn-gradiant"
                                                    onClick={changeOwner}
                                                >
                                                    LAUNCH TOKEN
                                                </button>
                                            )}{' '}
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
                    <div className="card">
                        <span>Royalties</span>
                        <div className="artist-title">
              <div className="d-flex flex-row justify-content-between w-100">
                <span>Royalties</span>
                <a href="#">
                  <img alt="" src={assetsImages.filter} />
                </a>
              </div>
            </div>
            <div className="artist-poll">
              <div className="poll-green">
                <img alt="" src={assetsImages.arrowup} />+ 1.57%
              </div>
              <div className="dropdown"></div>
              <div className="amount">$1,000,000</div>
            </div>
            <div className="first-row-main-dash">
              <div className="left-col">
                <div className="below-row">
                  <Performbar />
                </div>
              </div>
            </div>
            <div className="footer-btn">
              <button className="btn-gradiant">Manage Royalties</button>
            </div>
                    </div>
                </div> */}

                {/* <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
                    <div className="card">
                        <div className="artist-title">
                            <div className="d-flex flex-row justify-content-between w-100">
                                <span>Top Fans</span>
                                <a href="#">
                                    <img alt="" src={assetsImages.filter} />
                                </a>
                            </div>
                        </div>
                        <div className="fans-list">
                            <ul>
                                {[1, 2, 3, 4, 5, 6].map((fan) => (
                                    <li key={fan}>
                                        <div className="fan-profile">
                                            <img alt="" src={assetsImages.artist} />
                                        </div>
                                        <div className="fan-details">
                                            <div className="fan-details-content">
                                                <span className="name">Bob Smith</span>
                                                <span className="content">...d95f3</span>
                                            </div>
                                            <div className="donate-amount">1,500 INF</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="footer-btn d-flex flex-row justify-content-between">
                                <button className="btn-gradiant">See More</button>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* <div className="col-lg-4 col-md-6 mt-4">
                    <div className="card button-card d-flex justify-content-between">
                        <div className="artist-title">
                            <div className="d-flex flex-row justify-content-between w-100">
                                <span>Drop NFT</span>
                                <a href="#">
                                    <img alt="" src={assetsImages.filter} />
                                </a>
                            </div>
                        </div>

                        <div className="footer-btn d-flex flex-row justify-content-between">
                            <a href="/createcollectible/single">
                                <button className="btn-gradiant">Single</button>
                            </a>
                            <a href="/createcollectible/multiple">
                                <button className="btn-gradiant">Multiple</button>
                            </a>
                        </div>
                    </div>
                </div> */}

                <div className="col-lg-4 col-md-6 mt-4">
                    <div className="card button-card d-flex justify-content-between">
                        <div className="artist-title">
                            <div className="d-flex flex-row justify-content-between w-100">
                                <span>public content</span>
                            </div>
                        </div>

                        <div className="footer-btn">
                            <button
                                className="btn-gradiant"
                                type="button"
                                onClick={() => setNFTCollection((NFTCollection) => !NFTCollection)}
                            >
                                NFT collection
                            </button>
                            <button
                                className="btn-gradiant"
                                type="button"
                                onClick={() => setnewvote((newvote) => !newvote)}
                            >
                                soundcloud playlist
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-6 mt-4">
                    <div className="card button-card d-flex justify-content-between">
                        <div className="artist-title d-flex flex-column align-items-center">
                            <div className="d-flex flex-row justify-content-between w-100">
                                <span>token gated content</span>
                            </div>
                        </div>
                        <div className="footer-btn">
                            <button
                                className="btn-gradiant"
                                onClick={() => setLink((link) => !link)}
                            >
                                video link
                            </button>
                            <button
                                className="btn-gradiant"
                                onClick={() => setSongUpload((songUpload) => !songUpload)}
                            >
                                upload song
                            </button>
                            <button
                                className="btn-gradiant"
                                onClick={() => {
                                    setShowPlaylistModal(playlistModal => !playlistModal);
                                }}
                            >
                                upload mixtape
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={newvote}
                className="edit-profile-modal newvote"
                onHide={() => setnewvote((newvote) => !newvote)}
            >
                <Modal.Header closeButton>
                    <span className="title">New Vote</span>
                </Modal.Header>

                <Modal.Body>
                    <div className="form-group">
                        <label>Sound Cloud Embed Link</label>
                        <input
                            className="form-control mb-3"
                            type="text"
                            placeholder="playlist embed link"
                            onChange={(e) => setSoundCloudLink(e.target.value)}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button
                        className="save-btn btn-gradiant"
                        onClick={() => uploadSoundCloudLink()}
                    >
                        Upload Playlist
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={success}
                className="edit-profile-modal success"
                onClick={() => setsuccess((success) => !success)}
            >
                <Modal.Header closeButton>
                    <span className="title">Public Playlist</span>
                </Modal.Header>

                <Modal.Body>
                    <div className="success-popup-content">
                        <img alt="" src={assetsImages.success} />
                        <h2 className="title">Success!</h2>
                        <p>Your soundcloud playlist has been updated and is now live</p>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button className="save-btn btn-gradiant">View Poll</button>
                </Modal.Footer>
            </Modal>
            <SweetAlert
                danger
                show={!connectedwallet}
                title="Please Connect Wallet"
                style={{ color: '#000' }}
                onConfirm={() => {
                    setconnectedwallet((connectedwallet) => !connectedwallet);
                }}
                onCancel={() => {
                    setconnectedwallet((connectedwallet) => !connectedwallet);
                }}
            ></SweetAlert>

            <Modal
                show={link}
                className="edit-profile-modal link"
                onHide={() => setLink((link) => !link)}
            >
                <Modal.Header closeButton>
                    <span className="title">Create Token Gated Link</span>;
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Original Content Url</label>
                            <input
                                id="url"
                                onChange={(e) => setURL(e.target.value)}
                                className="form-control mb-3"
                                type="text"
                                placeholder="Example: https://myprivatevideo-youtube.com"
                            />
                            <label>Link Title</label>
                            <input
                                id="title"
                                onChange={(e) => setLinkTitle(e.target.value)}
                                className="form-control mb-3 mt-3"
                                type="text"
                                placeholder="Link Title"
                            />

                            <label>Select Token</label>
                            <select
                                id="tokenAddress"
                                onChange={(e) => setTokenAddress(e.target.value)}
                                className="form-control mb-3 mt-3"
                            >
                                <option>Select Token</option>
                                <option value={`${socialTokenAddress}`}>
                                    {socialTokenAddress}
                                </option>
                            </select>
                            <label>Amount of Tokens Required</label>
                            <input
                                id="balance"
                                onChange={(e) => setBalance(e.target.value)}
                                className="form-control mb-3 mt-4"
                                type="number"
                                placeholder="ex. 100"
                            />
                            <button
                                className="upload-profile btn-gradiant"
                                onClick={() => {
                                    saveInflowGatedLink(url, balance);
                                    setLinkSuccess((linkSuccess) => !linkSuccess);
                                }}
                                type="submit"
                            >
                                Created Token Gated Link
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal show={linkSuccess} className="edit-profile-modal success">
                <Modal.Header
                    closeButton
                    onClick={() => setLinkSuccess((linkSuccess) => !linkSuccess)}
                >
                    <span className="title">Your Token Gated Link</span>
                </Modal.Header>

                <Modal.Body>
                    <div className="success-popup-content">
                        <img alt="" src={assetsImages.success} />
                        <h2 className="title">Success!</h2>
                        <p>
                            Your token gated link has been created. It will now be on your artist
                            page
                        </p>
                        {/* <button
                            className="btn-gradiant"
                            onClick={() => {
                                navigator.clipboard.writeText(localStorage.getItem('link'));
                                // saveMintgateLink(localStorage.getItem('link'));
                            }}
                        >
                            Copy Link
                        </button> */}
                    </div>
                </Modal.Body>
            </Modal>
            <NFTCollectionModal 
                NFTCollection={NFTCollection}
                setNFTCollection={setNFTCollection}/>
            <UploadSong
                songUpload={songUpload}
                setSongUpload={setSongUpload}
                id={id}    
                />
            <CreatePlaylist 
                showPlaylistModal={showPlaylistModal}
                setShowPlaylistModal={setShowPlaylistModal}
                id={id} 
                />
        </div>
    );
};

export default Artistpic;
