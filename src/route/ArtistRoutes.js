import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import Header from "../base/Header";
import Sidebar from "../base/Sidebar";

function ArtistRoute(props) {
	
	const token = useSelector((state) => state.auth.token);
	const isArtist = useSelector((state) => state.auth.isArtist);

	console.log({ isArtist })

	if (!token) {
		return <Redirect to="/login" />;
	}
	if (!isArtist) {
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

export default ArtistRoute;
