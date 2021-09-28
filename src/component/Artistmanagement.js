import React, { useState, useEffect, useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import "./component.css";
import "./Artistmanagement.css";
import { assetsImages } from "../constants/images";
// import Customdropdown from "./Customdropdown";
import Performbar from "./Performbar";
import { useParams } from "react-router-dom";
import { Contract, ethers } from "ethers";
// import ProgressBar from "react-bootstrap/ProgressBar";
import { Modal } from "react-bootstrap";
import SocialToken from "../artifacts/contracts/token/social/SocialToken.sol/SocialToken.json";
// import Loader from "./Loader";
import { Inflow } from "../inflow-solidity-sdk/src/Inflow";
import Axios from 'axios';
import SmallLoader from "./SmallLoader";
import { useSelector } from "react-redux";
import { WalletProviderContext } from "../contexts/walletProviderContext";
import SweetAlert from "react-bootstrap-sweetalert";
import { CreateMintgateLink } from "../hooks/createMintGate";
import Button from '@material-ui/core/Button';
import { styled } from '@mui/material/styles';
import Grid from '@material-ui/core/Grid'
import TextField from '@mui/material/TextField';
import { Magic } from "magic-sdk";
import axios from 'axios';

const Input = styled('input')({
  display: 'none',
});


const Artistpic = () => {
  //const { walletProvider } = useContext(WalletProviderContext);
  // const [profileModel, setProfileModel] = useState(false);
  const [walletProvider, setWalletProvider] = useState();
  const [tokenfrees, settokenfrees] = useState(false);
  const [newvote, setnewvote] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(false);
  const [mp3File, setMp3File] = useState('');
  const [mp3Link, setMp3Link] = useState(false);
  const [mp3FileName, setMp3FileName] = useState('');
  const [mp3Uploaded, setMp3Uploaded] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  /*MintGate Integration state*/
  const [videoLink, setVideoLink] = useState(false);
  
  const [url, setURL] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [mintgateLink, setMintgateLink] = useState('');
  const [linkSuccess, setLinkSuccess] = useState(false);

  const jwt = process.env.REACT_APP_MINTGATE_JWT;

  const [success, setsuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [connectedwallet, setconnectedwallet] = useState(true);
  const uid = useSelector((state) => state.auth.data._id);
  const [socialTokenAddress, setSocialTokenAddress] = useState('');
  const [artist, setArtist] = useState('');
  const [hasActivated, setHasActivated] = useState();

  //const { loading, data } = useQuery(GET_TOKEN_FEES); Cannot useQuery as subgraph not deployed
  const [tokenfees, settokenfees] = useState(0.0);

  const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY_RINKEBY, {
    network: "rinkeby",
  });

  useEffect(() => {
    setUploaded(false);
  })

  useEffect(async () => {

    const isLoggedIn = await magic.user.isLoggedIn();
    console.log('isLoggedIn', isLoggedIn)
   
    if(isLoggedIn) {
      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      //dispatch(connected({ address: address }));
      setWalletProvider(provider);
      //dispatch(setProvider(provider));
      setConnectedWallet(true);      
    } else {
      setConnectedWallet(false);
    }

        const id = uid;
        const { data } = await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/getbyid`, { id } );
        console.log(data.artist.has_activated);
        setHasActivated(data.artist.has_activated);
        setSocialTokenAddress(data.artist.social_token_id);
        setLoading(false);   
  }, [])

  const formatAndSetTokenFees = async (value) => {
    const provider = walletProvider;
    const inflow = new Inflow(provider, 4);
    const tokenfees = inflow.formatERC20("USDC", String(value));
    settokenfees(tokenfees);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await CreateMintgateLink(url, linkTitle, tokenAddress, balance, jwt);
  }

  const saveInflowGatedLink = async (url) => {
    console.log('savedLink!!!!', url)
    // await Axios.post( `${process.env.REACT_APP_SERVER_URL}/v1/artist/updatemintgateurls`,  { url } )
    await Axios.post( `${process.env.REACT_APP_SERVER_URL}/v1/artist/updateinflowgatedurls`,  { inflowGatedUrl: url, balance } )
  }

  const changeOwner = async () => {
    const provider = walletProvider;
    const signer = provider.getSigner();
    const socialToken = new Contract(
      socialTokenAddress,
      SocialToken.abi,
      signer
    );
    try {
      await socialToken.transferOwnership('0x76aB04F8Adb222C7Bbc27991A82498906954dEae');
    } catch (error) {
      console.log(error);
    }
    const id = uid;
    Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/activatetrue`, { id });
  };

  const handleUpload = (e) => {
    console.log('handleUpload fired')
    setMp3File(e.target.files[0]);
    setUploaded(true);
  }

  const handleFileName = (e) => {
    setMp3FileName(e.target.value);
  }

  const uploadMp3 = async (e) => {
    if(!mp3File){
      alert('please upload a valid .mp3 file');
    } else if (!mp3FileName){
      alert('please add a file name');
    } else {
      const data = new FormData();

      data.append("mp3_name", mp3FileName);
      data.append("mp3_file", mp3File);

      console.log({ data })

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/uploadmp3`, data)
      .then((res) => {
        console.log(res);
        setMp3Uploaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  console.log('uploaded', uploaded)

  return (
    <div className="dashboard-wrapper-main artist-management">
      <div className="heading">Artist Management</div>
      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="card">
            <div className="artist-title">
              <div className="d-flex flex-row justify-content-between w-100">
                <span>Token Fees</span>
              </div>
            </div>
            <div className="artist-poll">
              <div className="poll-green">
                <img alt="" src={assetsImages.arrowup} />+ 3.10%
              </div>
              <div className="dropdown"></div>
              <div
                className="amount d-flex justify-content-center align-items-center text-wrap"
                style={{ wordWrap: "break-word" }}
              >
                {loading ? <SmallLoader /> : "100"}
              </div>
            </div>
            <div className="first-row-main-dash">
              <div className="left-col"> 
                <div className="below-row">
                {hasActivated ? <Button variant="disabled" style={{height : '100px', width: '100px'}}>
                  ACTIVATED
                  </Button> 
                  : <button className="btn-gradiant" onClick={changeOwner}>
                  ACTIVATE
                  </button>}
                </div>
              </div>
            </div>
            <div className="footer-btn">
              {/* <button className='btn-gradiant' onClick={() => settokenfrees(tokenfrees => !tokenfrees)}>
                                Cash Out
                            </button> */}
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mt-4 mt-md-0">
          <div className="card">
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
        </div>

        <div className="col-lg-4 col-md-6 mt-4 mt-lg-0">
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
        </div>

        <div className="col-lg-4 col-md-6 mt-4">
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
        </div>

        <div className="col-lg-4 col-md-6 mt-4">
          <div className="card button-card d-flex justify-content-between">
            <div className="artist-title">
              <div className="d-flex flex-row justify-content-between w-100">
                <span>New Proposal</span>
                <a href="#">
                  <img alt="" src={assetsImages.filter} />
                </a>
              </div>
            </div>

            <div className="footer-btn">
              <button
                className="btn-gradiant"
                type="button"
                onClick={() => setnewvote((newvote) => !newvote)}
              >
                Create Vote
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mt-4">
          <div className="card button-card d-flex justify-content-between">
            <div className="artist-title d-flex flex-column align-items-center">
              <div className="d-flex flex-row justify-content-between w-100">
                <span>TOKEN GATED LINKS</span>
                <a href="#">
                  <img alt="" src={assetsImages.filter} />
                </a>
              </div>
            </div>

            <div className="footer-btn">
              
            </div>

            <div className="footer-btn">
            <Button variant="contained" color="secondary" size="large" style={{color: "white", borderRadius: 50, boxShadow: 100, margin: 10}}
              onClick={() => setVideoLink((videoLink) => !videoLink)}>
              VIDEO LINKS
            </Button>
            <Button variant="contained" color="secondary" size="large" style={{color: "white", borderRadius: 50, boxShadow: 40, margin: 10}}
              onClick={() => {
                setMp3Link((mp3Link) => !mp3Link)
                setUploaded((uploaded) => !uploaded)
                }}>
              UNRELEASED MUSIC
            </Button>
              
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
            <label>Location</label>
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Address"
            />
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Option 1"
            />
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Option 2"
            />
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Option 3"
            />
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Option 4"
            />
            <button className="upload-profile btn-gradiant">+</button>
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="End Date"
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            className="save-btn btn-gradiant"
            onClick={() => setsuccess((success) => !success)}
          >
            Launch Poll
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={success}
        className="edit-profile-modal success"
        onClick={() => setsuccess((success) => !success)}
      >
        <Modal.Header closeButton>
          <span className="title">Location of next concert</span>
        </Modal.Header>

        <Modal.Body>
          <div className="success-popup-content">
            <img alt="" src={assetsImages.success} />
            <h2 className="title">Success!</h2>
            <p>Your poll has been created and is now live</p>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button className="save-btn btn-gradiant">View Poll</Button>
        </Modal.Footer>
      </Modal>
      <SweetAlert
        danger
        show={!connectedwallet}
        title="Please Connect Wallet"
        style={{ color: "#000" }}
        onConfirm={() => {
          setconnectedwallet((connectedwallet) => !connectedwallet);
        }}
        onCancel={() => {
          setconnectedwallet((connectedwallet) => !connectedwallet);
        }}
      ></SweetAlert>

      <Modal
        show={tokenfrees}
        className="edit-profile-modal sell"
        onHide={() => settokenfrees((tokenfrees) => !tokenfrees)}
      >
        <Modal.Header closeButton>
          <span className="title">Token Fees</span>
        </Modal.Header>

        <Modal.Body>
          <div className="form-group">
            <input className="form-control" type="text" placeholder="Amount" />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Wallet address"
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button className="save-btn btn-gradiant">Cash Out</button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={videoLink}
        className="edit-profile-modal link"
        onHide={() => setVideoLink((videoLink) => !videoLink)}
      >
        <Modal.Header closeButton>
          <span className="title">Create Token Gated Link</span>
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
              placeholder="Example: https://youtube.com"
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
            <select id="tokenAddress"
              onChange={(e) => setTokenAddress(e.target.value)}
              className="form-control mb-3 mt-3">
              <option>Select Token</option>
              <option value={`${socialTokenAddress}`}>{socialTokenAddress}</option>
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
            onClick={() => setLinkSuccess((linkSuccess) => !linkSuccess)}
            type="submit">Created Token Gated Link</button>
          </div>
          </form>
        </Modal.Body>

      </Modal>

      <Modal
        show={linkSuccess}
        className="edit-profile-modal success"
      >
        <Modal.Header closeButton 
        onClick={() => setLinkSuccess((linkSuccess) => !linkSuccess)}>
          <span className="title">Your Token Gated Link</span>
        </Modal.Header>

        <Modal.Body>
          <div className="success-popup-content">
            <img alt="" src={assetsImages.success} />
            <h2 className="title">Success!</h2>
            <p>Your token gated link has been created</p>
            <input
              value={localStorage.getItem('link')}
              className="form-control mb-3"
              type="text"
            />
            
            <button className="btn-gradiant" onClick={() => {
              navigator.clipboard.writeText(localStorage.getItem('link'));
              // saveMintgateLink(localStorage.getItem('link'))
              saveInflowGatedLink(url, balance);
              }}>Copy Link</button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal 
        show={mp3Link}
        className="edit-profile-modal success"
        onHide={() => {
          setMp3Link((mp3Link) => !mp3Link);
          }}>
          <Modal.Header >
          <Grid container style={{flexGrow: 1}}>
          <Grid item xs={12} style={{paddingBottom: 30}}>
                <span className="login-title col-12"> upload your mp3</span>
                </Grid>
          </Grid>
          </Modal.Header>
          <Modal.Body>
              <Grid container direction="row">
              <Grid item xs={9}>
                <div className="comman-row-input">
                          <input
                          placeholder="track name"
                          type="text"
                          name="twitter url"
                          onChange={handleFileName}
                          />
                      </div>
              </Grid>
              <Grid item xs={3}>
                  {uploaded? 
                    <Button 
                      variant="disabled" 
                      size="large"  
                      style={{marginLeft: 20, backgroundColor: 'grey'}}
                      component="span"> 
                      UPLOAD 
                    </Button> 
                  :  
                  <label htmlFor="contained-button-file">
                  <Input id="contained-button-file" multiple type="file" onChange={handleUpload}/>
                  <Button 
                      variant="contained" 
                      size="large" 
                      color="secondary" 
                      style={{marginLeft: 20}}
                      component="span"> 
                      UPLOAD 
                    </Button>
                    </label>}
              </Grid>
              </Grid>
              <Modal.Footer>
                <button className="btn-gradiant m-1" onClick={uploadMp3}>
                    CREATE
                </button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>


    </div>

    
  );
};

export default Artistpic;
