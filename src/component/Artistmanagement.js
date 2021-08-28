import React, { useState, useEffect, useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import "./component.css";
import "./Artistmanagement.css";
import { assetsImages } from "../constants/images";
// import Customdropdown from "./Customdropdown";
import Performbar from "./Performbar";
// import ProgressBar from "react-bootstrap/ProgressBar";
import { Modal } from "react-bootstrap";
// import Loader from "./Loader";
import { Inflow } from "../inflow-solidity-sdk/src/Inflow";
// import { ethers } from 'ethers';
import SmallLoader from "./SmallLoader";
import { useSelector } from "react-redux";
import { WalletProviderContext } from "../contexts/walletProviderContext";
import SweetAlert from "react-bootstrap-sweetalert";

const GET_TOKEN_FEES = gql`
  query {
    minteds {
      royaltyPaid
    }
  }
`;

const Artistpic = () => {
  const { walletProvider } = useContext(WalletProviderContext);
  // const [profileModel, setProfileModel] = useState(false);
  const wallet = useSelector((state) => state.wallet);
  const [tokenfrees, settokenfrees] = useState(false);
  const [newvote, setnewvote] = useState(false);
  const [success, setsuccess] = useState(false);
  const [connectedwallet, setconnectedwallet] = useState(true);

  const { loading, data } = useQuery(GET_TOKEN_FEES);
  const [tokenfees, settokenfees] = useState(0.0);

  useEffect(() => {
    if (!wallet.wallet_connected) {
      setconnectedwallet(false);
    }
  }, []);

  useEffect(() => {
    if (data) {
      let tokenfees = 0;
      data.minteds.forEach((item) => {
        tokenfees += item.royaltyPaid;
      });
      formatAndSetTokenFees(tokenfees);
    }
  }, [data]);

  const formatAndSetTokenFees = async (value) => {
    const provider = walletProvider;
    const inflow = new Inflow(provider, 4);
    const tokenfees = inflow.formatERC20("USDC", String(value));
    // console.log({tokenfees})
    settokenfees(tokenfees);
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
                <a href="#">
                  <img alt="" src={assetsImages.filter} />
                </a>
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
                <div className="below-row">{/* <Performbar /> */}</div>
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
              <div className="soundcloud-url d-flex flex-column justify-content-center align-items-center">
                <h4>Soundcloud Playlist URL</h4>
                <input type="text" className="soundcloud-input" />
              </div>
            </div>

            <div className="footer-btn">
              <button className="btn-gradiant">Create URL</button>
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
    </div>
  );
};

export default Artistpic;
