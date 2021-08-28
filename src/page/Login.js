/* eslint-disable */
import React, { useState, useEffect } from "react";
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

const Login = () => {
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
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
  });
  const captchaRef = React.useRef(null);

  useEffect(() => {
    if (token) {
      history.push("/");
    }
    //setUser({displayName:'', ...uData})
    //window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
  }, [token]);

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
    console.log("register func", user);
    event.preventDefault();
    const { email, password, account_type } = user;
    //// console.log('++++', email, password)
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!reg.test(String(email).toLowerCase())) {
      setErrorFlg("email");
      setErrorMessage("Invalid Email");
    } else if (password.length < 6) {
      setErrorFlg("password");
      setErrorMessage("Password must be 8 charachter long");
    } else {
      setErrorFlg("undefined");
      setErrorMessage("");
      try {
        if (authSelectFlag) {
          console.log("aaa", account_type, email);
          await dispatch(loginUser({ email, password, account_type }));
          dispatch(setclienturl({ clienturl: "" }));
        } else {
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

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUser({ ...user, [name]: value });
    setErrorFlg("");
    setErrorMessage("");
  };

  const handleChangeUsertpe = (e) => {
    setUser({ ...user, account_type: e.target.value });
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
    <div className="login-page-main">
      {loading && <Loader />}
      {alert}
      <div className="recaptcha-container" ref={captchaRef}></div>
      <div className="left-cols-main">
        <div className="logos-row">
          <img alt="" src={assetsImages.logo} />
          Inflow
        </div>
        <div className="new-row-for-descriptions">
          <div className="login-headings">
            New Music <br /> Economy
          </div>
          <p className="descriptions-main">
            Connecting fans and artists in new ways.
            <br /> Invest in artists. Collect their NFTs. and vote on their
          </p>
          <div className="button">
            <button
              className="login-btn"
              onClick={() => {
                setAuthSelectFlag(!authSelectFlag);
                setForgotPasswordFlag(false);
              }}
            >
              {authSelectFlag ? "Sign Up" : "Login"}
            </button>
            <button
              className="login-btn"
              onClick={() => setForgotPasswordFlag(!forgotPasswordFlag)}
            >
              Forgot Password
            </button>
          </div>
        </div>
      </div>
      <div className="right-cols-main">
        <div className="creat-name-main">
          {" "}
          {forgotPasswordFlag
            ? "Forgot Password"
            : authSelectFlag
            ? "Login Account"
            : "Create Account"}
        </div>
        {forgotPasswordFlag ? null : (
          <div className="social-icons">
            <a
              className="mail-icon"
              href="#"
              onClick={() => setPhoneRegisterFlag(false)}
            >
              {" "}
              <img alt="" src={assetsImages.envelope} />
            </a>
            <a
              className="call-icon"
              href="#"
              onClick={() => setPhoneRegisterFlag(true)}
            >
              {" "}
              <img alt="" src={assetsImages.telephone} />
            </a>
            <a
              href="#"
              onClick={() => signInWithSocialAccount(facebookProvider)}
            >
              {" "}
              <img alt="" src={assetsImages.facebook} />
            </a>
            <a href="#" onClick={() => signInWithSocialAccount(googleProvider)}>
              {" "}
              <img alt="" src={assetsImages.google} />
            </a>
            {/* <a href="#">
              {" "}
              <img alt="" src={assetsImages.twitter} />
            </a>
            <a href="#">
              {" "}
              <img alt="" src={assetsImages.linkedin} />
            </a> */}
          </div>
        )}
        <div className="or-use">
          {forgotPasswordFlag
            ? "use email for forgot password"
            : phoneRegisterFlag
            ? "use phone number for registration"
            : authSelectFlag
            ? "use email for login"
            : "use email for registration"}
        </div>
        {phoneRegisterFlag ? (
          <form onSubmit={handleRegisterWithPhone}>
            {!authSelectFlag && (
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
              <PhoneInput
                country={"us"}
                value={user.phone}
                onChange={(value) => {
                  setUser({ phone: value });
                }}
              />
            </div>
            {errorFlg === "phone" ? (
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
            ) : null}
            {optSent ? (
              <>
                <div className="comman-row-input password-row">
                  <input
                    placeholder="OTP"
                    type="text"
                    name="otp"
                    value={user.otp}
                    onChange={handleChange}
                  />
                </div>
                {errorFlg === "otp" ? (
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
                ) : null}
              </>
            ) : null}
            <button type="submit" className="sign-up-btn">
              {optSent ? (authSelectFlag ? "Login" : "Register") : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            {/* <form> */}
            {forgotPasswordFlag
              ? null
              : !authSelectFlag && (
                  <>
                    <div className="comman-row-input persons-row">
                      <input
                        placeholder="Name"
                        type="text"
                        name="displayName"
                        value={user.displayName}
                        onChange={handleChange}
                      />
                    </div>
                  </>
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
            {errorFlg === "email" ? (
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
            ) : null}
            {forgotPasswordFlag ? null : (
              <>
                <div className="comman-row-input password-row">
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                  />
                </div>
                {errorFlg === "password" ? (
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
                ) : null}
              </>
            )}
            {!forgotPasswordFlag && (
              <button type="submit" className="sign-up-btn">
                {authSelectFlag ? "Login" : "Sign Up"}
              </button>
            )}
            {forgotPasswordFlag && (
              <button
                type="button"
                className="sign-up-btn"
                onClick={forgotPassword}
              >
                Forgot password
              </button>
            )}

            <select defaultValue="user" onChange={handleChangeUsertpe}>
              <option value="user">Admin or Fan</option>
              <option value="artist">Artist</option>
            </select>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
