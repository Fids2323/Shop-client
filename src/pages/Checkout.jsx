import React, {useState} from "react";
import Helmet from "../components/Layout/Helmet";
import FormOrder from "../components/ui/FormOrder";
import {useSelector} from "react-redux";
import Button from "../components/common/Button";

const Checkout = () => {
	const totalQuantity = useSelector((state) => state.cart.totalQuantity);
	const totalAmount = useSelector((state) => state.cart.totalAmount);

	return (
		<Helmet title="Checkout">
			<div className="h-44 mb-4 bg-main flex items-center justify-center">
				<h2 className="text-main font-semibold text-white">Checkout</h2>
			</div>

			<section className="py-10 px-1">
				<div className="container mx-auto">
					<div className="flex gap-4">
						<div className="w-8/12">
							<h6 className="mb-4 fw-bold text-xl font-semibold">Billing Information</h6>
							<FormOrder />
						</div>

						<div className="w-4/12">
							<div className="bg-main rounded-lg text-white p-5">
								<h6 className="flex items-center justify-between mb-5">
									Total Qty:
									<span>{totalQuantity} items</span>
								</h6>
								<h6 className="flex items-center justify-between mb-5">
									Subtotal:
									<span>${totalAmount}</span>
								</h6>

								<h4 className="flex items-center justify-between border-t-2 pt-4 mb-5">
									Total Cost: <span>${totalAmount}</span>
								</h4>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Helmet>
	);
};

export default Checkout;
