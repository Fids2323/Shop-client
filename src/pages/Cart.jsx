import React from "react";
import Helmet from "../components/Layout/Helmet";
import {cartActions} from "../store/slices/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Button from "../components/common/Button";
import config from "../config";

const Cart = () => {
	const cartItems = useSelector((state) => state.cart.cartItems);
	const totalAmount = useSelector((state) => state.cart.totalAmount);

	return (
		<Helmet title="Cart">
			<div className="h-44 bg-main flex items-center justify-center">
				<h2 className="text-main font-semibold text-white">Shopping Cart</h2>
			</div>

			<section className="my-10 px-1">
				<div className="container mx-auto">
					<div className="flex items-center flex-col gap-4 md:flex-row   md:items-start">
						<div className="w-full md:w-9/12">
							{cartItems.length ? (
								<table className="w-full text-center">
									<thead className="border-b-2">
										<tr>
											<th>Image</th>
											<th>Title</th>
											<th>Price</th>
											<th>Qty</th>
											<th>Delete</th>
										</tr>
									</thead>

									<tbody>
										{cartItems.map((item, index) => (
											<Tr item={item} key={index} />
										))}
									</tbody>
								</table>
							) : (
								<h2>Сart is empty</h2>
							)}
						</div>

						<div className="w-full sm:w-8/12 md:w-3/12">
							<div className="mb-8">
								<h6 className="flex text-md font-semibold items-center justify-between">
									Subtotal
									<span className="text-md font-semibold">${totalAmount}</span>
								</h6>
							</div>

							<div className="flex mx-auto flex-col gap-4 w-6/12 md:w-full">
								<Button backgroundColor={"bg-main"}>
									<Link to="/checkout">Checkout</Link>
								</Button>
								<Button backgroundColor={"bg-main"}>
									<Link to="/shop">Continue Shopping</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Helmet>
	);
};

const Tr = ({item}) => {
	const dispatch = useDispatch();
	const deleteProduct = () => {
		dispatch(cartActions.deleteItem(item.id));
	};
	return (
		<tr>
			<td className="w-20 h-20">
				<img src={`${config.apiEndpoint}/uploads/${item.imgUrl}.jpg`} alt={item.title} />
			</td>
			<td className="text-sm md:text-lg">{item.title}</td>
			<td>${item.price}</td>
			<td>{item.quantity}</td>
			<td className="active:scale-125">
				<i className="ri-delete-bin-line cursor-pointer " onClick={deleteProduct}></i>
			</td>
		</tr>
	);
};

export default Cart;
