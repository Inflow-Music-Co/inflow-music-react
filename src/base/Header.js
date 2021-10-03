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
import Button from "@material-ui/core/Button";
import { logout } from "../store/reducers/authSlice";
import { makeStyles } from "@material-ui/core/styles";
import LoginModal from "../page/LoginModal";

const styles = {
  button: {
    color: "white",
    background: "linear-gradient(45deg, #8A17A5 30%, #707DF8 90%)",
    borderRadius: 30,
    boxShadow: "20px",
    "&:hover": {
      background: "linear-gradient(45deg, #707DF8 30%, #8A17A5 90%)",
    },
  },
};

const useStyles = makeStyles(styles);

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  const wallet = useSelector((state) => state.wallet);
  const token = useSelector((state) => state.auth.token);
  const [login, setLogin] = useState(false);
  const classes = useStyles();

  const updatePage = (page) => {
    dispatch(updateActivePage(page));
  };

  const onLogin = () => {
    setLogin((login) => !login);
  };

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
      <div className="left-col-main"></div>
      {token ? (
        <Button
          className={classes.button}
          variant="contained"
          size="large"
          color="secondary"
          style={{ marginLeft: 10 }}
          href="/dashboard"
          onClick={() => updateActivePage("dashboard")}
        >
          MY DASHBOARD
        </Button>
      ) : (
        <Button
          className={classes.button}
          variant="contained"
          size="large"
          color="secondary"
          style={{ marginLeft: 10 }}
          onClick={onLogin}
        >
          LOGIN
        </Button>
      )}
      <div className="right-col-main">
        <div className="profile-dropdown">
          <Profiledropdown />
        </div>
      </div>
      {login ? <LoginModal login={login} setLogin={setLogin} /> : null}
    </div>
  );
};

export default Header;
