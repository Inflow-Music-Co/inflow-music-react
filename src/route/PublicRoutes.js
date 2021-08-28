/* eslint-disable */

import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../base/Header";
import Sidebar from "../base/Sidebar";

function PublicRoute(props) {
  if (props.path === "/login") {
    return <Route {...props} />;
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="main-comman-wrapping">
        <Route {...props} />
      </div>
    </>
  );
}

export default PublicRoute;
