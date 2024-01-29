import {Routes, Route, Navigate} from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import LoginPage from "../pages/LoginPage";
import Shop from "../pages/Shop";
import ProductInfo from "../pages/ProductInfo";
import Checkout from "../pages/Checkout";
import SignUp from "../pages/SignUp";
import Dashboard from "../components/admin/Dashboard";
import AllProducts from "../components/admin/AllProducts";
import AddProducts from "../components/admin/AddProducts";
import AllOrders from "../components/admin/AllOrders";
import AllUsers from "../components/admin/AllUsers";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
	return (
		<Routes>
			<Route path="home" element={<Home />} />
			<Route path="shop" element={<Shop />} />
			<Route path="shop/:id" element={<ProductInfo />} />
			<Route path="cart" element={<Cart />} />
			<Route path="login" element={<LoginPage />} />
			<Route path="signup" element={<SignUp />} />

			<Route path="/*" element={<ProtectedRoute />}>
				<Route path="checkout" element={<Checkout />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="dashboard/all-products" element={<AllProducts />} />
				<Route path="dashboard/add-product" element={<AddProducts />} />
				<Route path="dashboard/orders" element={<AllOrders />} />
				<Route path="dashboard/users" element={<AllUsers />} />
			</Route>

			<Route path="/" element={<Navigate to="home" />} />
		</Routes>
	);
};

export default Routers;
