import React, {useRef, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import userImg from "../../assets/images/user.png";
import {useDispatch} from "react-redux";
import {logout} from "../../store/slices/authSlice";

const adminNav = [
	{
		display: "Dashboard",
		path: "/dashboard",
	},
	{
		display: "All-Products",
		path: "/dashboard/all-products",
	},
	{
		display: "Orders",
		path: "/dashboard/orders",
	},
	{
		display: "Users",
		path: "/dashboard/users",
	},
];

const AdminNav = () => {
	const [isHidden, setIsHidden] = useState(true);
	const dispatch = useDispatch();
	const profileActionRef = useRef(null);

	const toggleProfileActions = () => {
		setIsHidden(!isHidden);
	};

	// const toggleProfileActions = () => {
	// 	profileActionRef.current.classList.toggle("hidden");
	// };

	const onClickLogout = () => {
		if (window.confirm("Are you sure you want to log?")) {
			dispatch(logout());
			window.localStorage.removeItem("access_token");
			window.localStorage.removeItem("refresh_token");
			window.localStorage.removeItem("role");
		}
	};
	return (
		<>
			<header className="w-full h-auto py-5 px-0 bg-main">
				<div className="w-full">
					<div className="container mx-auto">
						<div className="flex items-center justify-between gap-10">
							<div className="logo">
								<h2 className="text-xl text-white">AllStocks</h2>
							</div>
							<div className="search__box flex items-center justify-between h-8 w-6/12 ">
								<input type="text" placeholder="Search..." className="rounded-lg h-full  mr-2 w-full px-1" />
								<span>
									<i className="ri-search-line text-white cursor-pointer"></i>
								</span>
							</div>
							<div className="admin__nav-top-right flex items-center justify-center gap-8">
								<span>
									<i className="ri-notification-3-line text-white cursor-pointer "></i>
								</span>
								<span>
									<i className="ri-settings-2-line text-white cursor-pointer"></i>
								</span>
								<div className="relative">
									<img src={userImg} alt="user icon" className={`w-8 h-8 cursor-pointer active:scale-110 ${isHidden ? "hidden" : ""}`} onClick={toggleProfileActions} />
									<div
										className="flex items-center justify-center flex-col absolute bg-gray-300 gap-2 top-10 text-main text-lg font-semibold border-2 border-main right-0 w-32 p-3 rounded hidden"
										ref={profileActionRef}
									>
										<Link to="/login" onClick={onClickLogout}>
											Logout
										</Link>
										<Link to="/home">Home</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<section className="admin__menu p-0 bg-hero w-full h-16">
				<div className="container mx-auto">
					<div className="">
						<div
							className="admin__navigation mx-auto
						my-4"
						>
							<ul className="admin__menu-list  flex items-center justify-center gap-10">
								{adminNav.map((item, index) => (
									<li className="admin__menu-item text-xl font-normal" key={index}>
										<NavLink to={item.path} className={(navClass) => (navClass.isActive ? "border-b-2 border-main" : "")}>
											{item.display}
										</NavLink>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default AdminNav;
