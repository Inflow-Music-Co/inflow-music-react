import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../base/Header";
import Sidebar from "../base/Sidebar";

function AdminRoute(props) {
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  if (!token) {
    return <Redirect to="/login" />;
  }
  if (!isAdmin) {
    return <Redirect to="/" />;
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

export default AdminRoute;
