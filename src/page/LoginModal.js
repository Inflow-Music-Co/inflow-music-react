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
import { connected } from "../store/reducers/walletSlice";
// const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY);

const LoginModal = (props) => {
  const { login, setLogin } = props;
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();
  const history = useHistory();
  const uData = useSelector((state) => state.auth.data);
  const token = useSelector((state) => state.auth.token);
  // console.log(uData);
  // const history = useHistory();
  const [authSelectFlag, setAuthSelectFlag] = useState(true);
  const [account_type, setAccountType] = useState("user");
  const [forgotPasswordFlag, setForgotPasswordFlag] = useState(false);
  const [phoneRegisterFlag, setPhoneRegisterFlag] = useState(false);
  const [optSent, setOptSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpConfirmation, setOtpConfirmation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlg, setErrorFlg] = useState("");
  // const [userType, setUserType] = useState({ account_type: "user" });
  const [loginType, setLoginType] = useState("login");
  // console.log(uData);
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
  const captchaRef = React.useRef(null);

  // useEffect(() => {
  //   if (token) {
  //     history.push("/");
  //   }
  //   //setUser({displayName:'', ...uData})
  //   //window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
  // }, [token]);

  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   const { email, password } = user;
  //   try {
  //     await auth.signInWithEmailAndPassword(email, password);
  //     setUser({ email: "", password: "" });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const magic = new Magic(process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY_RINKEBY, {
    network: "rinkeby",
  });

  // magic.network = "ethereum";

  const getAddressAndProvider = async () => {
    const provider = new ethers.providers.Web3Provider(magic.rpcProvider);
    setWalletProvider(provider);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    dispatch(connected({ address: address }));
    return { address, provider };
  };

  const handleLoginWithMagic = async (e) => {
    try {
      const { email, account_type } = user;
      await dispatch(loginWithMagicLink({ email, account_type }));
      setLogin((login) => !login);
      dispatch(setclienturl({ clienturl: "" }));
      const walletInstance = await getAddressAndProvider();
      console.log({ walletInstance });
      // alert(walletInstance.provider);
      // alert(walletInstance.address);
    } catch (e) {
      console.log("handleLoginWithMagic", e);
    }
  };

  useEffect(() => {
    if (token) {
      history.push("/");
    }
    //setUser({displayName:'', ...uData})
    //window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
  }, [token]);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUser({ ...user, [name]: value });
    setErrorFlg("");
    setErrorMessage("");
  };

  const handleChangeUsertype = (e) => {
    setUser({ ...user, account_type: e.target.id });
    // setUserType(e.target.id);
  };

  const forgotPassword = async () => {
    try {
      await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/v1/user/resetpassword`,
        { email: user.email }
      );
      showAlert("Check your email for changing password", "info");
      history.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  function showAlert(title, type) {
    MySwal.fire({
      title: <p style={{ color: "white" }}>{title}</p>,
      icon: type || "info",
      customClass: {
        confirmButton: "btn-gradiant",
      },
      buttonsStyling: false,
      background: "#303030",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAlertConfirm(type);
      }
    });
    setLoading(false);
  }

  function handleAlertConfirm(type) {
    if (type === "success") {
      setTimeout(() => {
        // window.location.href = "/";
        history.push("/");
      }, 1500);
    }
  }

  return (
    <>
      <Modal
        show={login}
        className="edit-profile-modal"
        onHide={() => {
          setLogin((login) => !login);
        }}
      >
        <Modal.Header closeButton>
          {/* <span className="title">Login</span> */}
          <div className="d-flex flex-row justify-content-center align-items-center col-12">
            <span className="login-title col-12">
              {forgotPasswordFlag ? (
                <h4 className="login-type">Forgot Password</h4>
              ) : (
                authSelectFlag && (
                  <div className="d-flex flex-row justify-content-around col-12">
                    <h4
                      className={`login-type ${
                        loginType === "login" && "login-type-active"
                      }`}
                      onClick={() => setLoginType("login")}
                    >
                      Login
                    </h4>
                    {/* <h4
                      className={`login-type ${
                        loginType === "signup" && "login-type-active"
                      }`}
                      onClick={() => setLoginType("signup")}
                    >
                      Sign Up
                    </h4> */}
                  </div>
                )
              )}
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          {!forgotPasswordFlag && (
            <div className="login-type d-flex flex-row justify-content-center col-12">
              <button
                id="user"
                className={`${
                  user.account_type === "user" ? "btn-selected" : "btn-gradiant"
                } mr-3`}
                onClick={handleChangeUsertype}
              >
                Fan
              </button>
              <button
                id="artist"
                className={`${
                  user.account_type === "artist"
                    ? "btn-selected"
                    : "btn-gradiant"
                } ml-3`}
                onClick={handleChangeUsertype}
              >
                Artist
              </button>
            </div>
          )}

          <div className="mt-5 mb-0 pb-0 form-group">
            <div onSubmit={``} className="col-12">
              {/* {!forgotPasswordFlag && loginType === "signup" && (
                <div className="comman-row-input persons-row">
                  <input
                    placeholder="Name"
                    type="text"
                    name="displayName"
                    value={user.displayName}
                    onChange={handleChange}
                  />
                </div>
              )} */}
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

              {/* {!forgotPasswordFlag && (
                <div className="comman-row-input password-row">
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>
              )}
              {errorFlg === "password" && (
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
              )} */}
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

            {/* {!forgotPasswordFlag && (
              <div className="mt-3" onClick={() => setForgotPasswordFlag(true)}>
                <h5 className="forgot-password">Forgot Password?</h5>
              </div>
            )} */}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
