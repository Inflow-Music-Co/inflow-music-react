/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setArtist, loginUser } from "../store/reducers/authSlice";
import { assetsImages } from "../constants/images";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import { auth, googleProvider, facebookProvider } from "../utils/firebase";
// import { Link } from 'react-router-dom';
import Loader from "../component/Loader";
import SweetAlert from "react-bootstrap-sweetalert";
import Axios from "axios";
import { setclienturl } from "../store/reducers/graphqlSlice";
import ReactBootstrap from "react-bootstrap";
import "./LoginModal.css";

const LoginModal = (props) => {
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
  const [alert, setAlert] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlg, setErrorFlg] = useState("");

  const { login, setLogin } = props;
  // const [userType, setUserType] = useState({ account_type: "user" });
  const [loginType, setLoginType] = useState("login");
  // console.log(uData);
  // const history = useHistory();
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
    account_type: "user",
  });
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

  const handleRegister = async (event) => {
    const { email, password, account_type } = user;
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg.test(String(email).toLowerCase())) {
      setErrorFlg("email");
      setErrorMessage("Invalid Email");
    } else if (password.length < 8) {
      setErrorFlg("password");
      setErrorMessage("Passwords must be at least 8 characters long");
    } else {
      setErrorFlg("undefined");
      setErrorMessage("");
      try {
        if (loginType === "login") {
          //login part
          // const { user } = await auth.signInWithEmailAndPassword(
          //   email,
          //   password
          // );
          // let isAdmin = false
          // const idTokenResult = await user.getIdTokenResult();
          // isAdmin = idTokenResult.claims.isAdmin ? true : false
          await dispatch(loginUser({ email, password, account_type }));
          // await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/register`, { firebase_user_id: user.uid, email: user.email, refresh_token: user.refreshToken })
          // const response = await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/isArtist`, { email: user.email })
          // // console.log(response.data);
          // dispatch(setArtist({ isArtist: response.data.isArtist }))
          // if (response.data.isArtist) {
          //   dispatch(setclienturl({ clienturl: response.data.artist.graphqlurl }))
          // } else {
          //   dispatch(setclienturl({ clienturl: '' }))
          // }
          setLogin((login) => !login);
          dispatch(setclienturl({ clienturl: "" }));
          // // showAlert('Login Successful', 'success')
          // setTimeout(() => {
          //   window.location.href = "/"
          // }, 1500)
          // window.location.href = "/";
        } else {
          // registeration part
          const res = await Axios.post(
            `${process.env.REACT_APP_SERVER_URL}/v1/user/register`,
            {
              name: user.displayName,
              email: user.email,
              password: user.password,
            }
          );
          if (!res.data.status) {
            //when this email is already used
            showAlert(res.data.message);
            return;
          }
          showAlert("Check your email and verify account", "info");
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        }
        // history.push("/");
      } catch (error) {
        console.error(error);
        showAlert("Invalid email or password");
      }
    }
  };

  // const handleRegisterWithPhone = async (event) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   if (optSent) {
  //     if (!user.otp) {
  //       setErrorFlg("otp");
  //       setErrorMessage("Please enter OTP sent to your phone");
  //       return;
  //     }
  //     //alert("send successfully");
  //     // const code = window.prompt('Please enter the verification ' +
  //     //     'code that was sent to your mobile device.');
  //     otpConfirmation
  //       .confirm(user.otp)
  //       .then((result) => {
  //         setLoading(false);
  //         showAlert("Login Successful", "success");
  //         setTimeout(() => {
  //           const loginUser = result.user;
  //           let isAdmin = false;
  //           loginUser
  //             .getIdTokenResult()
  //             .then((idTokenResult) => {
  //               isAdmin = idTokenResult.claims.isAdmin ? true : false;
  //               // dispatch(
  //               //   login({
  //               //     phoneNumber: user.phone,
  //               //     uid: loginUser.uid,
  //               //     token: loginUser.refreshToken,
  //               //     isAdmin,
  //               //   })
  //               // );
  //               Axios.post(
  //                 `${process.env.REACT_APP_SERVER_URL}/v1/user/register`,
  //                 {
  //                   uid: user.uid,
  //                   phone: user.phone,
  //                   refresh_token: user.refreshToken,
  //                 }
  //               );
  //             })
  //             .then(() => {
  //               Axios.post(
  //                 `${process.env.REACT_APP_SERVER_URL}/v1/artist/isArtist`,
  //                 { email: user.email }
  //               );
  //             })
  //             .then((response) => {
  //               // console.log(response.data);
  //               dispatch(setArtist({ isArtist: response.data.isArtist }));
  //               if (response.data.isArtist) {
  //                 dispatch(
  //                   setclienturl({ clienturl: response.data.artist.graphqlurl })
  //                 );
  //               } else {
  //                 dispatch(setclienturl({ clienturl: "" }));
  //               }
  //               hideAlert();
  //             });
  //         }, 2000);
  //       })
  //       .catch((error) => {
  //         showAlert("Invalid OTP", "error");
  //       });
  //   } else {
  //     if (user.phone.length < 10) {
  //       setErrorFlg("phone");
  //       setErrorMessage("Phone must be 10 charachter long");
  //     } else {
  //       window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  //         captchaRef.current,
  //         {
  //           size: "invisible",
  //         }
  //       );
  //       const appVerifier = window.recaptchaVerifier;
  //       const phoneNumber = "+" + user.phone;
  //       auth
  //         .signInWithPhoneNumber(String(phoneNumber), appVerifier)
  //         .then((confirmResult) => {
  //           setOptSent(true);
  //           setOtpConfirmation(confirmResult);
  //           setLoading(false);
  //         })
  //         .catch((error) =>
  //           showAlert(
  //             `Sign In With Phone Number Error: ${error.message}`,
  //             "error"
  //           )
  //         );
  //     }
  //   }
  // };

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
    console.log("dddd", e.target.id);
    setUser({ ...user, account_type: e.target.id });
    // setUserType(e.target.id);
  };

  const forgotPassword = async () => {
    try {
      await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/v1/user/resetpassword`,
        { email: user.email }
      );
      showAlert("check your email for changing password", "info");
      // window.location.href = "/login";
    } catch (e) {
      console.error(e);
    }
  };

  const signInWithSocialAccount = async (provider) => {
    // auth
    //   .signInWithPopup(provider)
    //   .then((result) => {
    //     const credential = result.credential;
    //     const token = credential.accessToken;
    //     const user = result.user;
    //     let isAdmin = false;
    //     // console.log(user.displayName)
    //     user.getIdTokenResult().then(idTokenResult => {
    //       isAdmin = idTokenResult.claims.isAdmin ? true : false
    //       dispatch(
    //         login({ email: user.email, uid: user.uid, token: user.refreshToken, isAdmin })
    //       );
    //       Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/register`, { firebase_user_id: user.uid, email: user.email, refresh_token: user.refreshToken, name: user.displayName })
    //     }).then(() => {
    //       Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/artist/isArtist`, { email: user.email })
    //     }).then((response) => {
    //       if (response) {
    //         // console.log({ response });
    //         dispatch(setArtist({ isArtist: response.data.isArtist }));
    //         if (response.data.isArtist) {
    //           dispatch(setclienturl({ clienturl: response.data.artist.graphqlurl }))
    //         } else {
    //           dispatch(setclienturl({ clienturl: '' }))
    //         }
    //         window.location.href = "/"
    //       }

    //     })
    //     //// console.log('++++++',user.email, user.uid, token);

    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     const email = error.email;
    //     const credential = error.credential;
    //     console.error(credential, errorMessage, email);
    //   });

    try {
      const result = await auth.signInWithPopup(provider);
      // const credential = result.credential;
      // const token = credential.accessToken;
      const user = result.user;
      let isAdmin = false;
      const idTokenResult = await user.getIdTokenResult();
      isAdmin = idTokenResult.claims.isAdmin ? true : false;
      // dispatch(
      //   login({
      //     email: user.email,
      //     uid: user.uid,
      //     token: user.refreshToken,
      //     isAdmin,
      //   })
      // );
      await Axios.post(`${process.env.REACT_APP_SERVER_URL}/v1/user/register`, {
        uid: user.uid,
        email: user.email,
        refresh_token: user.refreshToken,
        name: user.displayName,
      });
      const response = await Axios.post(
        `${process.env.REACT_APP_SERVER_URL}/v1/artist/isArtist`,
        { email: user.email }
      );
      // console.log(response.data)
      dispatch(setArtist({ isArtist: response.data.isArtist }));
      if (response.data.isArtist) {
        dispatch(setclienturl({ clienturl: response.data.artist.graphqlurl }));
      } else {
        dispatch(setclienturl({ clienturl: "" }));
      }
      window.location.href = "/";
    } catch (error) {
      // const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.error(credential, errorMessage, email);
    }
  };

  function showAlert(title, type) {
    setAlert(
      <SweetAlert
        style={{ color: "#000" }}
        type={type}
        onConfirm={() => handleAlertConfirm(type)}
        timeout={3000}
        title={title}
      />
    );
    setLoading(false);
  }

  function handleAlertConfirm(type) {
    if (type === "success") {
      hideAlert();
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else {
      hideAlert();
    }
  }

  function hideAlert() {
    setAlert(null);
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
        {alert}
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
                    <h4
                      className={`login-type ${
                        loginType === "signup" && "login-type-active"
                      }`}
                      onClick={() => setLoginType("signup")}
                    >
                      Sign Up
                    </h4>
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
            <form onSubmit={``} className="col-12">
              {!forgotPasswordFlag && loginType === "signup" && (
                <div className="comman-row-input persons-row">
                  <input
                    placeholder="Name"
                    type="text"
                    name="displayName"
                    value={user.displayName}
                    onChange={handleChange}
                  />
                </div>
              )}
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

              {!forgotPasswordFlag && (
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
              )}
            </form>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <div className="d-flex flex-column flex-wrap justify-content-center align-items-center col-12">
            <div className="">
              {!forgotPasswordFlag && (
                <button className="btn-gradiant" onClick={handleRegister}>
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

            {!forgotPasswordFlag && (
              <div className="mt-3" onClick={() => setForgotPasswordFlag(true)}>
                <h5 className="forgot-password">Forgot Password?</h5>
              </div>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
