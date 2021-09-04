import React, { useContext, useState, useEffect } from "react";
import "./base.css";
import "./Header.css";
//import Search from '../component/Search';
import Notification from "../component/Notification";
import Profiledropdown from "../component/Profiledropdown";
import { Button } from "react-bootstrap";
import Wallet from "../utils/wallet";
import { useDispatch, useSelector } from "react-redux";
import { connected, disconnect } from "../store/reducers/walletSlice";
import { WalletProviderContext } from "../contexts/walletProviderContext";
import { assetsImages } from "../constants/images";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const { walletProvider, setWalletProvider } = useContext(
    WalletProviderContext
  );
  const wallet = useSelector((state) => state.wallet);
  const token = useSelector((state) => state.auth.token);
  // const wallet = useSelector(state => state.wallet);

  // console.log({wallet})
  useEffect(() => {
    if (wallet.wallet_connected) {
      conn();
    }
    // eslint-disable-next-line
  }, []);

  const conn = async () => {
    await Wallet.connect();
    dispatch(connected({ address: Wallet.account }));
    setWalletProvider(Wallet.ethersProvider);
  };

  const connectWallet = async () => {
    if (!token) {
      history.push("/");
      return;
    }
    try {
      if (!walletProvider) {
        if (!Wallet.ethersProvider) {
          await Wallet.connect();
        }
        dispatch(connected({ address: Wallet.account }));
        setWalletProvider(Wallet.ethersProvider);
        MySwal.fire({
          title: (
            <p style={{ color: "white" }}>Wallet connected successfully</p>
          ),
          icon: "success",
          customClass: {
            confirmButton: "btn-gradiant",
          },
          buttonsStyling: false,
          background: "#303030",
        });
        // setTimeout(() => {
        //     window.location.reload();
        // },1500)
      } else {
        Wallet.disconnect(true);
        dispatch(disconnect());
        MySwal.fire({
          title: <p style={{ color: "white" }}>Wallet disconnected</p>,
          icon: "info",
          customClass: {
            confirmButton: "btn-gradiant",
          },
          buttonsStyling: false,
          background: "#303030",
        });
        setWalletProvider(null);
        history.push("/");
      }
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <div className="header-main">
      <div className="logo-website-main">
        <Link to={"/"}>
          <img alt="" src={assetsImages.logo} className="logo-main-image" />
        </Link>
      </div>
      <div className="left-col-main">{/* <Search /> */}</div>
      <div className="right-col-main">
        <button className="btn-gradiant mr-4" onClick={connectWallet}>
          temp-web3-btn
        </button>
        <div className="notified-main">
          <Notification />
        </div>
        <div className="profile-dropdown">
          <Profiledropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
