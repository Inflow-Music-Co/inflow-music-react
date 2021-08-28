import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const LoginModal = (props) => {
  const { login, setLogin } = props;
  const [type, setType] = useState("");
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <Modal
        show={login}
        className="edit-profile-modal"
        onHide={() => {
          setLogin((login) => !login);
          setType("");
        }}
      >
        <Modal.Header closeButton>
          <span className="title">Login</span>
        </Modal.Header>

        <Modal.Body>
          <div className="login-type d-flex flex-row justify-content-center col-12">
            <button
              className={`${
                type === "fan" ? "btn-selected" : "btn-gradiant"
              } mr-3`}
              onClick={() => setType("fan")}
            >
              Fan
            </button>
            <button
              className={`${
                type === "artist" ? "btn-selected" : "btn-gradiant"
              } ml-3`}
              onClick={() => setType("artist")}
            >
              Artist
            </button>
          </div>

          <div className="mt-5 form-group">
            <form onSubmit={``} className="col-12">
              <div className="comman-row-input persons-row">
                <input
                  placeholder="Name"
                  type="text"
                  name="displayName"
                  value={user.displayName}
                  onChange={handleChange}
                />
              </div>
              <div className="comman-row-input email-row">
                <input
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="comman-row-input password-row">
                <input
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>

          <div className="user-profile"></div>
        </Modal.Body>

        {type && (
          <Modal.Footer>
            <div className="d-flex flex-column flex-wrap justify-content-center align-items-center">
              <button
                className="btn-gradiant"
                onClick={() => {
                  window.location.href = "/login";
                }}
              >
                Login
              </button>
              <a href="/login" className="forgot-password mt-3">
                Forgot Password?
              </a>
            </div>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default LoginModal;
