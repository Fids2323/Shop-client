import React from "react";
import Header from "./Header";
import Routers from "../../routers/Routers";
import Footer from "./Footer";
import AdminNav from "../admin/AdminNav";
import {useLocation} from "react-router-dom";

const Layout = () => {
	const location = useLocation();

	return (
		<div className="flex flex-col min-h-screen">
			{location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Header />}
			<div className="grow">
				<Routers />
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
