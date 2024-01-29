import React from "react";
import GroupList from "../common/GroupList";
import {useNavigate} from "react-router-dom";

const category = [{name: "Mobile Phones"}, {name: "Smart Watches"}, {name: "Video Cards"}, {name: "Laptops"}];

const usefulLinks = [{name: "Shop", path: "shop"}, {name: "Cart", path: "cart"}, {name: "Login", path: "login"}, {name: "Privacy Policy"}];

const Footer = () => {
	const navigate = useNavigate();

	return (
		<footer className="bg-main pt-2 md:pt-10 pb-6 w-full">
			<div className="container px-2 pt-5 mx-auto flex items-center justify-between mb-8">
				<div className="flex flex-col md:flex-row gap-5 md:gap-2">
					<div className="lg:w-4/12 md:w-6/12">
						<div className="mb-1 md:mb-5">
							<h1 className="text-white text-xl">AllStocks</h1>
						</div>
						<p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia enim ipsum unde excepturi numquam doloremque fuga impedit autem nesciunt ex.</p>
					</div>

					<GroupList title={"Top Categories"} arr={category} className={"lg:w-3/12 md:w-3/12"} />

					<GroupList title={"Useful Links"} arr={usefulLinks} className={"lg:w-2/12 md:w-3/12"} />

					<div className="lg:w-3/12 md:w-4/12">
						<div>
							<h4 className="text-white text-lg mb-1 md:mb-5">Contact</h4>
							<ul className="text-white flex flex-col gap-2">
								<li className="flex gap-2">
									<span>
										<i className="ri-map-pin-line text-xl"></i>
									</span>
									<p className="text-gray-400">Moscow st. Resultativnaya 23</p>
								</li>
								<li className="flex gap-2">
									<span>
										<i className="ri-phone-line text-xl"></i>
									</span>
									<a href="tel:+092039023092392" className="text-gray-400">
										+092039023092392
									</a>
								</li>
								<li className="flex gap-2">
									<span>
										<i className="ri-mail-line text-xl"></i>
									</span>
									<a href="mailto:AllStocks@gmail.com" className="text-gray-400">
										AllStocks@gmail.com
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full text-center">
				<p className="text-gray-400">
					Copyright 2023 developed by{" "}
					<a href="https://github.com/Fids2323" target="_blank" rel="noopener noreferrer">
						Dmitry Homsky
					</a>
					. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
