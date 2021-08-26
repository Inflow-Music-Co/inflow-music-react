import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setArtist, loginUser } from "../store/reducers/authSlice";
import SweetAlert from "react-bootstrap-sweetalert";
import { assetsImages } from "../constants/images";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Axios from "axios";
import { setclienturl } from "../store/reducers/graphqlSlice";
import ReactBootstrap from "react-bootstrap";
import { Modal } from "react-bootstrap";

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
  const [type, setType] = useState("fan");
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
  });

  useEffect(() => {
    if (token) {
      history.push("/");
    }
    //setUser({displayName:'', ...uData})
    //window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
  }, [token]);

  const handleChangeUsertype = (userType) => {
    setUser({ ...user, account_type: userType});
    console.log(user);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  };

  const showAlert = (title, type) => {
    setAlert(
      <SweetAlert
        style={{ color: "#000" }}
        type={type}
        onConfirm={() => handleAlertConfirm(type)}
        timeout={3000}
        title={title}/>
    );
    setLoading(false);
  }

  const handleAlertConfirm = (type) => {
    if (type === "success") {
      hideAlert();
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } else {
      hideAlert();
    }
  }

  const hideAlert = () => {
    setAlert(null); 
  }

  const handleRegister = async (event) => {
    console.log("register func", user);
    event.preventDefault();
    const { email, password, account_type } = user;
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
          console.log("aaa", account_type, email)
          await dispatch(loginUser({ email, password, account_type }));
          dispatch(setclienturl({ clienturl: '' }))
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
          }, 1500)
        }
        // history.push("/");
      } catch (error) {
        console.error(error);
        showAlert('Invalid email or password');
      }
    }
  };

  return (
    <>
      <Modal show={login}
        className="edit-profile-modal"
        onHide={() => {
          setLogin((login) => !login);
          setType('fan')}}>
        <Modal.Body>
          <div className="login-type d-flex flex-row justify-content-center col-12">
            <button
              className={`${
                type === "fan" ? "btn-selected" : "btn-gradiant"
              } mr-3`}
              onClick={() => {setType("fan"); handleChangeUsertype("artist")}}>
              fan
            </button>
            <button
              className={`${
                type === "artist" ? "btn-selected" : "btn-gradiant"
              } ml-3`}
              onClick={() => {setType("artist"); handleChangeUsertype("user")}}>
              artist
            </button>
          </div>
          <div className="mt-5 form-group">
            <form className="col-12">
              <div className="comman-row-input persons-row">
              </div>
              <div className="comman-row-input email-row">
                <input
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}/>
              </div>
              <div className="comman-row-input password-row">
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}/>
              </div>
              <h6>don't have an account?</h6>
              <div className="button">
            <button className="login-btn">
            sign up
            </button>
          </div>
          {type && (
          <Modal.Footer>
          <button onClick={handleRegister} className="btn-gradiant">
              Login
            </button>
          </Modal.Footer>)}
            </form>
          </div>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default LoginModal;
