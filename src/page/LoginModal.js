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

  const selectFan = () => {
    if (type === "fan") {
      return "btn-selected";
    } else {
      return "btn-gradiant";
    }
  };

  const selectArtist = () => {
    if (type === "artist") {
      return "btn-selected";
    } else {
      return "btn-gradiant";
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <Modal
        show={login}
        className="edit-profile-modal"
        onHide={() => setLogin((login) => !login)}
      >
        <Modal.Header closeButton>
          <span className="title">Login</span>
        </Modal.Header>

        <Modal.Body>
          <div className="login-type d-flex flex-row justify-content-center col-12">
            <button
              className={`${selectFan()} ml-3`}
              onClick={() => setType("fan")}
            >
              Fan
            </button>
            <button
              className={`${selectArtist()} ml-3`}
              onClick={() => setType("artist")}
            >
              Artist
            </button>
          </div>

          <div className="mt-3 form-group">
            <form onSubmit={``}>
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
            </form>
          </div>

          <div className="user-profile"></div>
        </Modal.Body>

        <Modal.Footer>
          {type && <button className="save-btn btn-gradiant">Login</button>}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
