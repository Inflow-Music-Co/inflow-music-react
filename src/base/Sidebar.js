import React, { useState } from "react";
import "./base.css";
import { Link } from "react-router-dom";
// import settings from '../assets/images/settings.svg';
import { assetsImages } from "../constants/images";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [activePage, updateActivePage] = useState("");
  const token = useSelector((state) => state.auth.token);
  const isArtist = useSelector((state) => state.auth.isArtist);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <div className="side-bar-main">
      <div className="side-bar-navigation">
        <Link to={"/"}>
          <div
            className={
              activePage === "inflowmusic"
                ? "nav-link-main active"
                : "nav-link-main"
            }
            onClick={() => updateActivePage("inflowmusic")}
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
            onClick={() => updateActivePage("labels")}
          >
            <img alt="" src={assetsImages.inventory} />
            <div className="d-flex justify-content-center align-items-center mt-2">
              <span className="small-heading-sidebar">Labels</span>
            </div>
          </div>
        </Link>

        {token !== "" && (
          <Link to={"/dashboard"}>
            <div
              className={
                activePage === "dashboard"
                  ? "nav-link-main active"
                  : "nav-link-main"
              }
              onClick={() => updateActivePage("dashboard")}
            >
              <img alt="" src={assetsImages.dashboard} />
              <div className="d-flex justify-content-center align-items-center mt-2">
                <span className="small-heading-sidebar">Dashboard</span>
              </div>
            </div>
          </Link>
        )}

        {isArtist && token && (
          <Link to={"/artistmanage"}>
            <div
              className={
                activePage === "demo7"
                  ? "nav-link-main active"
                  : "nav-link-main"
              }
              onClick={() => updateActivePage("demo7")}
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
                activePage === "demo5"
                  ? "nav-link-main active"
                  : "nav-link-main"
              }
              onClick={() => updateActivePage("demo5")}
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
                activePage === "demo3"
                  ? "nav-link-main active"
                  : "nav-link-main"
              }
              onClick={() => updateActivePage("demo3")}
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
      </div>
    </div>
  );
};

export default Sidebar;
