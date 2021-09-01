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

// const GET_TOKEN_FEES = gql`
//   query {
//     minteds {
//       royaltyPaid
//     }
//   }
// `;

const Artistpic = () => {
  const { walletProvider } = useContext(WalletProviderContext);
  // const [profileModel, setProfileModel] = useState(false);
  const wallet = useSelector((state) => state.wallet);
  const [tokenfrees, settokenfrees] = useState(false);
  const [newvote, setnewvote] = useState(false);

  /*MintGate Integration state*/
  const [link, setLink] = useState(false);
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
  const [activated, setActivated] = useState(false);

  //const { loading, data } = useQuery(GET_TOKEN_FEES); Cannot useQuery as subgraph not deployed
  const [tokenfees, settokenfees] = useState(0.0);

  useEffect(async () => {
    if (!wallet.wallet_connected) {
      setconnectedwallet(false);
    } else {
        const id = uid;
        const { data } = await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/getbyid`, { id } );
        setSocialTokenAddress(data.artist.social_token_id);
        setLoading(false);
    }     
  }, [])


  const formatAndSetTokenFees = async (value) => {
    const provider = walletProvider;
    const inflow = new Inflow(provider, 4);
    const tokenfees = inflow.formatERC20("USDC", String(value));
    settokenfees(tokenfees);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateMintgateLink(url, linkTitle, tokenAddress, balance, jwt);
  }

  const changeOwner = async () => {
    console.log('click')
    const provider = walletProvider;
    const signer = provider.getSigner();
    const socialToken = new Contract(
      socialTokenAddress,
      SocialToken.abi,
      signer
    );
    try {
      await socialToken.transferOwnership('0x76aB04F8Adb222C7Bbc27991A82498906954dEae');
      setActivated(true);
    } catch (error) {
      console.log(error);
    }
    

  };

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
                {activated ? <button className="btn-gradiant" onClick={changeOwner}>
                  ACTIVATED
                  </button> 
                  : <button className="btn-gradiant">
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
                <span>Private Links</span>
                <a href="#">
                  <img alt="" src={assetsImages.filter} />
                </a>
              </div>
            </div>

            <div className="footer-btn">
              <button className="btn-gradiant"
              onClick={() => setLink((link) => !link)}>Create URL</button>
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
          <button className="save-btn btn-gradiant">View Poll</button>
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
        show={link}
        className="edit-profile-modal link"
        onHide={() => setLink((link) => !link)}
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
              <option value="0x6Fb4EA5198f5587A5c0573FD64A84e301DfeE8A3">0x6Fb4EA5198f5587A5c0573FD64A84e301DfeE8A3</option>
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
        onClick={() => setLinkSuccess((linkSuccess) => !linkSuccess)}
      >
        <Modal.Header closeButton>
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
          </div>
        </Modal.Body>
      </Modal>

    </div>

    
  );
};

export default Artistpic;
