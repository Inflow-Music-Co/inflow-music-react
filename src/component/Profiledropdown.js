/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './component.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { assetsImages } from '../constants/images';
import { logout } from '../store/reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoginModal from '../page/LoginModal';
import { useHistory } from 'react-router-dom';
import './Profiledropdown.css';

function Profiledropdown() {
    const history = useHistory();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const firstName = useSelector((state) => state.auth.data.first_name);
    const country = useSelector((state) => state.auth.data.country);
    const profileImage = useSelector((state) => state.auth.data.profile_image);
    const [login, setLogin] = useState(false);

    const onLogin = () => {
        setLogin((login) => !login);
    };

    const onEdit = () => {
        history.push('/accountsettings');
    };

    const onLogout = () => {
        dispatch(logout());
        history.push('/');
    };

    return (
        <div className="Dropdown-main-header">
            <Dropdown>
                <Dropdown.Toggle id="dropdown-custom-1">
                    <img
                        alt=""
                        src={
                            profileImage
                                ? `${process.env.REACT_APP_SERVER_URL}/${profileImage}`
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
                        style={{ minWidth: '300px', height: '300px' }}
                    >
                        <div className="card-header">{/* <span className='close'>X</span> */}</div>

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
                                                    : profileImage
                                                    ? `${process.env.REACT_APP_SERVER_URL}/${profileImage}`
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
                            <div className="user-name">{firstName}</div>
                            <div className="user-album">{country}</div>
                            {!token ? (
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
                    </div>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default Profiledropdown;
