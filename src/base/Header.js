import React, { useContext, useState, useEffect } from "react";
import "./base.css";
import "./Header.css";
//import Search from '../component/Search';
import Notification from "../component/Notification";
import Profiledropdown from "../component/Profiledropdown";
import { Button } from "react-bootstrap";
import Wallet from "../utils/wallet";
import SweetAlert from "react-bootstrap-sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { connected, disconnect } from "../store/reducers/walletSlice";
import { WalletProviderContext } from "../contexts/walletProviderContext";
import LoginModal from "../page/LoginModal";
import { assetsImages } from "../constants/images";
import { Link } from "react-router-dom";

const Header = () => {
  const { walletProvider, setWalletProvider } = useContext(
    WalletProviderContext
  );
  const wallet = useSelector((state) => state.wallet);
  const token = useSelector((state) => state.auth.token);
  // const wallet = useSelector(state => state.wallet);
  const dispatch = useDispatch();
  const [alert, setalert] = useState(null);
  const [login, setLogin] = useState(false);

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
      window.location.href = "/";
      return;
    }
    try {
      if (!walletProvider) {
        if (!Wallet.ethersProvider) {
          await Wallet.connect();
        }
        dispatch(connected({ address: Wallet.account }));
        setWalletProvider(Wallet.ethersProvider);
        showAlert("Wallet connected successfully", "success");
        // setTimeout(() => {
        //     window.location.reload();
        // },1500)
      } else {
        Wallet.disconnect(true);
        showAlert("Wallet disconnected", "info");
        dispatch(disconnect());
        setWalletProvider(null);
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const showAlert = (title, type) => {
    setalert(
      <SweetAlert
        style={{ color: "#000" }}
        type={type}
        onConfirm={hideAlert}
        timeout={2000}
        title={title}
      />
    );
  };

  const hideAlert = () => {
    setalert(null);
  };

  return (
    <div className="header-main">
      {alert}
      <div className="logo-website-main">
        <Link to={"/"}>
          <img alt="" src={assetsImages.logo} className="logo-main-image" />
        </Link>
      </div>
      <div className="left-col-main">{/* <Search /> */}</div>
      <div className="right-col-main">
        {/* <Button
          size="sm"
          className="mr-2 wallet-button"
          //   onClick={() => connectWallet()}
          onClick={() => setLogin((login) => !login)}>
          {walletProvider ? "Logout" : "Login"}
        </Button> */}
        <div className="notified-main">
          <Notification />
        </div>
        <div className="profile-dropdown">
          <Profiledropdown />
        </div>
      </div>
      {/* <LoginModal login={login} setLogin={setLogin}/> */}
    </div>
  );
};

export default Header;
