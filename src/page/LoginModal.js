/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setArtist,
  loginUser,
  loginWithMagicLink,
} from "../store/reducers/authSlice";
import { assetsImages } from "../constants/images";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { auth, googleProvider, facebookProvider } from "../utils/firebase";
// import { Link } from 'react-router-dom';
import Loader from "../component/Loader";
import Axios from "axios";
import { setclienturl } from "../store/reducers/graphqlSlice";
import ReactBootstrap from "react-bootstrap";
import "./LoginModal.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { WalletProviderContext } from "../contexts/walletProviderContext";
import { Magic } from "magic-sdk";
import { ethers } from "ethers";
import { connected, setProvider } from "../store/reducers/walletSlice";

const LoginModal = (props) => {
  const { login, setLogin } = props;
  WalletProviderContext;
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const history = useHistory();
  const uData = useSelector((state) => state.auth.data);
  const token = useSelector((state) => state.auth.token);
  const [authSelectFlag, setAuthSelectFlag] = useState(true);
  // const [account_type, setAccountType] = useState("user");
  const [forgotPasswordFlag, setForgotPasswordFlag] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlg, setErrorFlg] = useState("");
  const [loginType, setLoginType] = useState("login");
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
    account_type: "user",
  });
  const { walletProvider, setWalletProvider } = useContext(
    WalletProviderContext
  );

  const customNodeOptions = {
    rpcUrl: "https://rpc-mainnet.maticvigil.com/", // Polygon RPC URL
    chainId: 137, // Polygon chain id
  };

  const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY, {
    network: customNodeOptions,
  });

  const handleLoginWithMagic = async (e) => {
    try {
      const { email } = user;
      await dispatch(loginWithMagicLink(email));
      setLogin((login) => !login);
      dispatch(setclienturl({ clienturl: "" }));

      // MagicLink Wallet Load
      const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      dispatch(connected({ address: address }));
      dispatch(setProvider(provider));
      setWalletProvider(provider);
      localStorage.setItem("provider", provider);
    } catch (e) {
      console.log("handleLoginWithMagic", e);
    }
  };

  useEffect(() => {
    if (token) {
      history.push("/");
    }
  }, [token]);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({ ...user, [name]: value });
    setErrorFlg("");
    setErrorMessage("");
  };

  const handleChangeUsertype = (e) => {
    setUser({ ...user, account_type: e.target.id });
  };

  return (
    <>
      <Modal
        show={login}
        className="edit-profile-modal"
        onHide={() => {
          setLogin((login) => !login);
        }}
      >
        <Modal.Header>
          <div className="d-flex flex-row justify-content-center align-items-center col-12">
            <span className="login-title col-12">
              {authSelectFlag && (
                <div className="d-flex flex-row justify-content-around col-12">
                  <h4
                    className="login-type"
                    onClick={() => setLoginType("login")}
                  >
                    Login
                  </h4>
                </div>
              )}
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="mt-5 mb-0 pb-0 form-group">
            <div className="col-12">
              <div className="comman-row-input email-row">
                <input
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              {errorFlg === "email" && (
                <div
                  style={{
                    color: "red",
                    marginTop: `-13px`,
                    marginBottom: "15px",
                    fontSize: "14px",
                  }}
                >
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex flex-column flex-wrap justify-content-center align-items-center col-12">
            <div className="">
              {!forgotPasswordFlag && (
                <button className="btn-gradiant" onClick={handleLoginWithMagic}>
                  {loginType === "login" ? "Login" : "Sign Up"}
                </button>
              )}

              {forgotPasswordFlag && (
                <div className="d-flex flex-row justify-content-around col-12">
                  <button
                    className="btn-gradiant m-1"
                    onClick={() => {
                      setForgotPasswordFlag(false);
                    }}
                  >
                    Login
                  </button>
                  <button className="btn-gradiant m-1" onClick={forgotPassword}>
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
