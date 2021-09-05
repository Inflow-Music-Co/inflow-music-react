import React from "react";
import { useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import Header from "../base/Header";
import Sidebar from "../base/Sidebar";

function AdminRoute(props) {
  const token = useSelector((state) => state.auth.token);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const history = useHistory();

  if (!token || !isAdmin) {
    history.push("/");
    return;
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
