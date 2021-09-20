import React, { useContext, useState, useEffect } from "react";
import "./base.css";
import "./Header.css";
//import Search from '../component/Search';
import Notification from "../component/Notification";
import Profiledropdown from "../component/Profiledropdown";
import { useDispatch, useSelector } from "react-redux";
import { assetsImages } from "../constants/images";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { updateActivePage } from "../store/reducers/appSlice";
import { logout } from "../store/reducers/authSlice";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const wallet = useSelector((state) => state.wallet);
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="header-main">
      <div className="logo-website-main">
        <Link to={"/"}>
          <img
            alt=""
            src={assetsImages.logo}
            className="logo-main-image"
            onClick={() => {
              dispatch(updateActivePage("artist"));
            }}
          />
        </Link>
      </div>
      <div className="left-col-main">{/* <Search /> */}</div>

      <div className="right-col-main">
        
        <div className="profile-dropdown">
          <Profiledropdown />
        </div>
      </div>
    </div>
  );
};

export default Header;
