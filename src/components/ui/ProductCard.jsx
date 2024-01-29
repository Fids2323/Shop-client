import React from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/slices/cartSlice";
import {toast} from "react-toastify";
import config from "../../config.json";

const ProductCard = ({item}) => {
	const dispatch = useDispatch();

	const addToCart = () => {
		dispatch(
			cartActions.addItem({
				id: item._id,
				title: item.title,
				price: item.price,
				imgUrl: item.imgUrl,
			})
		);
		toast.success("Product added successfully");
	};

	return (
		<div className="mb-2 h-full md:w-3/12 lg:w-3/12 w-1/2">
			<div>
				<div className="w-full">
					<img src={`${config.apiEndpoint}/uploads/${item.imgUrl}.jpg`} alt={item.title} className="hover:scale-90 ease-out duration-300 z-0 " />
				</div>
				<div className="p-2">
					<h3>
						<Link to={`/shop/${item._id}`} className="text-lg md:text-xl text-main font-semibold mt-4 hover:text-inherit">
							{item.title}
						</Link>
					</h3>
					<span className="text-sm md:text-md text-gray-500">{item.category}</span>
				</div>
				<div className="flex items-center justify-between p-2">
					<span className="text-main text-lg font-medium">${item.price}</span>
					<span className="active:scale-110">
						<i class="ri-add-line text-lg bg-main text-white rounded p-1" onClick={addToCart}></i>
					</span>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
