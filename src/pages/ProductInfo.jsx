import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Helmet from "../components/Layout/Helmet";
import Button from "../components/common/Button";
import ProductDetails from "../components/ui/ProductDetails";
import {useDispatch} from "react-redux";
import {cartActions} from "../store/slices/cartSlice";
import {toast} from "react-toastify";
import config from "../config.json";
import axios from "../axios.js";

const ProductInfo = () => {
	const {id} = useParams();

	const [product, setProduct] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get(`/products/${id}`)
			.then((res) => {
				setProduct(res.data.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, [id]);

	const {title, imgUrl, price, shortDesc, avgRating} = product;

	const dispatch = useDispatch();

	const addToCart = () => {
		dispatch(
			cartActions.addItem({
				id,
				imgUrl,
				title,
				price,
			})
		);
		toast.success("Product added successfully");
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [product]);

	return (
		<>
			<Helmet title={product ? product.title : "product"}></Helmet>
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<section className="pb-10">
						<div className="container mx-auto">
							<div className="flex">
								{/*Card product*/}
								<div className="w-6/12">
									<img src={`${config.apiEndpoint}/uploads/${imgUrl}.jpg`} alt={title} />
								</div>

								<div className="w-6/12 mt-16">
									<h2 className="text-4xl font-semibold text-main mb-2">{title}</h2>
									<div className="flex items-center gap-5 mb-4">
										<div>
											<span>
												<i className="ri-star-s-fill" style={{color: "coral"}}></i>
											</span>
											<span>
												<i className="ri-star-s-fill" style={{color: "coral"}}></i>
											</span>
											<span>
												<i className="ri-star-s-fill" style={{color: "coral"}}></i>
											</span>
											<span>
												<i className="ri-star-s-fill" style={{color: "coral"}}></i>
											</span>
											<span>
												<i className="ri-star-half-s-line" style={{color: "coral"}}></i>
											</span>
										</div>
										<p>
											(
											<span className="font-semibold" style={{color: "coral"}}>
												{avgRating}
											</span>{" "}
											rating)
										</p>
									</div>

									<span className="text-lg font-medium mb-3">${price}</span>
									<p className="mb-8">{shortDesc}</p>

									<Button backgroundColor={"bg-main"} onClick={() => addToCart()}>
										Add to cart
									</Button>
								</div>
							</div>
						</div>
					</section>

					<ProductDetails product={product} />
				</>
			)}
		</>
	);
};

export default ProductInfo;
