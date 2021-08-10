import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../base/Header";
import Sidebar from "../base/Sidebar";

function PrivateRoute(props) {
  
  const token = useSelector((state) => state.auth.token);
  if (!token) {
    return <Redirect to="/login" />;
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

export default PrivateRoute;
