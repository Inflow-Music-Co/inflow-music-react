/* eslint-disable */
import React, { useEffect, useState } from "react";
import "./component.css";
import Dropdown from "react-bootstrap/Dropdown";
import { assetsImages } from "../constants/images";
import { logout } from "../store/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import LoginModal from "../page/LoginModal";
// import { Redirect } from "react-router-dom";

function Profiledropdown() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const uid = useSelector((state) => state.auth.data._id);
  const [firstname, setfirstname] = useState("");
  const [country, setcountry] = useState("");
  const [profileimage, setprofileimage] = useState("");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/v1/user/profile/get`,
        { uid }
      );
      const { user } = data;
      if (user) {
        setfirstname(user.first_name ? user.first_name : user.name);
        setcountry(user.country ? user.country : "");
        setprofileimage(user.profile_image);
      }
    } catch (e) {}
  };

  const onLogin = () => {
    // window.location.href = "/login";
    setLogin((login) => !login);
  };

  // const onEdit = () => {
  //     window.location.href = "/accountsettings";
  // }

  const onLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  return (
    <div className="Dropdown-main-header">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-custom-1">
          <img
            alt=""
            src={
              profileimage !== ""
                ? `${process.env.REACT_APP_SERVER_URL}/${profileimage}`
                : assetsImages.person
            }
          />
        </Dropdown.Toggle>
        <Dropdown.Menu className="super-colors profile-dropdown-main">
          {/*<Dropdown.Item eventKey="1">Action</Dropdown.Item>*/}
          {/*<Dropdown.Item eventKey="2">Another action</Dropdown.Item>*/}
          {/*<Dropdown.Item eventKey="3" onClick={()=> dispatch(logout())} active>*/}
          {/*    Logout*/}
          {/*</Dropdown.Item>*/}
          <div
            className="profile-dropdown-card"
            style={{ minWidth: "300px", height: "300px" }}
          >
            <div className="card-header">
              {/* <span className='close'>X</span> */}
            </div>

            <div className="Profile-dropdown-img">
              <div className="background-img-wrapper">
                <img alt="" src={assetsImages.background} />
                <div className="img-wrapper">
                  <div className="full-scree-icon">
                    <img alt="" src={assetsImages.fullscreen} />
                  </div>
                  <div className="profile-img">
                    <img
                      alt=""
                      src={
                        !token
                          ? assetsImages.person
                          : profileimage
                          ? `${process.env.REACT_APP_SERVER_URL}/${profileimage}`
                          : assetsImages.person
                      }
                    />
                  </div>
                  <div className="money-icon">
                    <img alt="" src={assetsImages.money} />
                  </div>
                </div>
              </div>
            </div>

            <div className="user-details">
              <div className="user-name">{firstname}</div>
              <div className="user-album">{country}</div>
              {token === null ? (
                <button className="wallet-button" onClick={onLogin}>
                  Login
                </button>
              ) : (
                <div className="d-flex justify-content-around">
                  {/* <button className="edit-button" onClick={onEdit} >
                                        Edit
                                    </button> */}
                  <button className="wallet-button" onClick={onLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>

            <LoginModal login={login} setLogin={setLogin} />

            {/* <div className="user-profile-details">
                            <ul>
                                <li>
                                    <div className="number">53</div>
                                    <span className="name">Following</span>
                                </li>
                                <li>
                                    <div className="number">78</div>
                                    <span className="name">NFTs</span>
                                </li>
                                <li>
                                    <div className="number">$78.5</div>
                                    <span className="name">New Worth</span>
                                </li>
                            </ul>
                        </div> */}

            {/* <div className="profile-card-body">
                            <div className="card-body-title">Following</div>
                            <ul className="following-list">
                                <li>
                                    <div className="user">
                                        <img alt="" src={assetsImages.person} />
                                    </div>
                                    <div className="follower-details">
                                        <div className="follower-content">
                                            <span className="album-name">
                                                Meg Thee
                                            </span>
                                            <span className="album-id">
                                                0x385f947276749Ce646f60x385f947276749Ce646f6
                                            </span>
                                        </div>
                                        <button className="option-btn">
                                            <img alt="" src={assetsImages.options} />
                                        </button>
                                    </div>
                                </li>
                                <li>
                                    <div className="user">
                                        <img alt="" src={assetsImages.person} />
                                    </div>
                                    <div className="follower-details">
                                        <div className="follower-content">
                                            <span className="album-name">
                                                Meg Thee
                                            </span>
                                            <span className="album-id">
                                                0x385f947276749Ce646f60x385f947276749Ce646f6
                                            </span>
                                        </div>
                                        <button className="option-btn">
                                            <img alt="" src={assetsImages.options} />
                                        </button>
                                    </div>
                                </li>
                                <li>
                                    <div className="user">
                                        <img alt="" src={assetsImages.person} />
                                    </div>
                                    <div className="follower-details">
                                        <div className="follower-content">
                                            <span className="album-name">
                                                Meg Thee
                                            </span>
                                            <span className="album-id">
                                                0x385f947276749Ce646f60x385f947276749Ce646f6
                                            </span>
                                        </div>
                                        <button className="option-btn">
                                            <img alt="" src={assetsImages.options} />
                                        </button>
                                    </div>
                                </li>
                                <li>
                                    <div className="user">
                                        <img alt="" src={assetsImages.person} />
                                    </div>
                                    <div className="follower-details">
                                        <div className="follower-content">
                                            <span className="album-name">
                                                Meg Thee
                                            </span>
                                            <span className="album-id">
                                                0x385f947276749Ce646f60x385f947276749Ce646f6
                                            </span>
                                        </div>
                                        <button className="option-btn">
                                            <img alt="" src={assetsImages.options} />
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div> */}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default Profiledropdown;
