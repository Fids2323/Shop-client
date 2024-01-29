import React from "react";
import {Navigate} from "react-router-dom";
import {Outlet} from "react-router-dom";

const ProtectedRoute = () => {
	const isAuth = window.localStorage.getItem("access_token");

	return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
