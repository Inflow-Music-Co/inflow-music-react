import React, { useEffect, useState } from "react";
import "./base.css";
import { Link } from "react-router-dom";
// import settings from '../assets/images/settings.svg';
import { assetsImages } from "../constants/images";
import { useDispatch, useSelector } from "react-redux";
import { updateActivePage } from "../store/reducers/appSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.app.activePage);
  const token = useSelector((state) => state.auth.token);
  const isArtist = useSelector((state) => state.auth.isArtist);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const userData = useSelector((state) => state.auth.data);

  const updatePage = (page) => {
    dispatch(updateActivePage(page));
  };

  return (
    <div className="side-bar-main">
      <div className="side-bar-navigation">
        <Link to={"/"}>
          <div
            className={
              activePage === "artist" ? "nav-link-main active" : "nav-link-main"
            }
            onClick={() => updatePage("artist")}
          >
            <img alt="" src={assetsImages.home} />
            <div className="d-flex justify-content-center align-items-center mt-2">
              <span className="small-heading-sidebar">Artists</span>
            </div>
          </div>
        </Link>

        <Link to={"/labels"}>
          <div
            className={
              activePage === "labels" ? "nav-link-main active" : "nav-link-main"
            }
            onClick={() => updatePage("labels")}
          >
            <img alt="" src={assetsImages.inventory} />
            <div className="d-flex justify-content-center align-items-center mt-2">
              <span className="small-heading-sidebar">Labels</span>
            </div>
          </div>
        </Link>
        {isArtist && token && userData.status === "active" && (
          <Link to={"/artistmanage"}>
            <div
              className={
                activePage === "artistmanage"
                  ? "nav-link-main active"
                  : "nav-link-main"
              }
              onClick={() => updatePage("artistmanage")}
            >
              <img alt="" src={assetsImages.calendar} />
              <div className="d-flex justify-content-center align-items-center mt-2">
                <span className="small-heading-sidebar">Manage Artist</span>
              </div>
            </div>
          </Link>
        )}

        {isAdmin && token && (
          <Link to={"/adminpanel"}>
            <div
              className={
                activePage === "adminpanel"
                  ? "nav-link-main active"
                  : "nav-link-main"
              }
              onClick={() => updatePage("adminpanel")}
            >
              <img alt="" src={assetsImages.orders} />
              <div className="d-flex justify-content-center align-items-center mt-2">
                <span className="small-heading-sidebar">Admin Panel</span>
              </div>
            </div>
          </Link>
        )}

        {token && (
          <Link to={"/accountsettings"}>
            <div
              className={
                activePage === "account"
                  ? "nav-link-main active"
                  : "nav-link-main"
              }
              onClick={() => updatePage("account")}
            >
              <img alt="" src={assetsImages.settings} />
              <div className="d-flex justify-content-center align-items-center mt-2">
                <span className="small-heading-sidebar">Account</span>
              </div>
            </div>
          </Link>
        )}

        {/* <Link to={"/news"}>
          <div
            className={
              activePage === "demo1" ? "nav-link-main active" : "nav-link-main"
            }
            onClick={() => updateActivePage("demo1")}
          >
            <img alt="" src={assetsImages.dashboard} />
          </div>
        </Link>
        <Link to={"/leaderboard"}>
          <div
            className={
              activePage === "demo2" ? "nav-link-main active" : "nav-link-main"
            }
            onClick={() => updateActivePage("demo2")}
          >
            <img alt="" src={assetsImages.wallet} />
          </div>
        </Link>

        <div
          className={
            activePage === "demo6"
              ? "nav-link-main settings-icon active"
              : "nav-link-main settings-icon"
          }
          onClick={() => updateActivePage("demo6")}
        >
          <img alt="" src={assetsImages.settings} />
        </div> */}
        {/* <Link onClick={() => {window.location.assign('https://inflowmusic.io/')}}>
        <img alt="" src={assetsImages.settings} />
              <div className="d-flex justify-content-center align-items-center mt-2">
                <span className="small-heading-sidebar">Account</span>
              </div>
        </Link> */}
      </div>
    </div>
  );
};

export default Sidebar;
