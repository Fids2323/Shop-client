import React, {useEffect, useRef, useState} from "react";
import Button from "../common/Button";
import ProductList from "./ProductList";
import {toast} from "react-toastify";
import productService from "../../service/product.service";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/slices/productsSlice";
import {useParams} from "react-router-dom";
import axios from "../../axios.js";

const ProductDetails = ({product}) => {
	const [tab, setTab] = useState("desc");
	const [rating, setRating] = useState(null);
	const reviewUser = useRef("");
	const reviewMessage = useRef("");
	const {id} = useParams();

	const dispatch = useDispatch();
	const {products, status} = useSelector((state) => state.product);
	const isProductLoading = status === "loading";

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	const similarProducts = products.filter((item) => item.category === product.category);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const reviewUserName = reviewUser.current.value;
		const reviewUserMessage = reviewMessage.current.value;

		const reviewObj = {
			username: reviewUserName,
			reviewText: reviewUserMessage,
			rating,
			id,
		};

		try {
			const {data} = await axios.post(`/review/${id}`, reviewObj);
			console.log(data);
			toast.success("Review added");
		} catch (e) {
			toast.error("Review error");
		}
	};

	return (
		<section className="pb-10">
			<div className="container mx-auto">
				<div className="flex flex-col">
					<div className="w-full mb-6">
						<div className="flex mb-5 items-center gap-5 text-lg text-main">
							<h6 className={`${tab === "desc" ? "font-semibold cursor-pointer" : "cursor-pointer"}`} onClick={() => setTab("desc")}>
								Description
							</h6>
							<h6 className={`${tab === "rev" ? "font-semibold cursor-pointer" : "cursor-pointer"}`} onClick={() => setTab("rev")}>
								Reviews ({product.reviews.length})
							</h6>
						</div>

						{tab === "desc" ? (
							<div>
								<p>{product.description}</p>
							</div>
						) : (
							<div>
								<div>
									<ul>
										{product.reviews?.map((item, index) => (
											<li key={index} className="mb-3">
												<h6>{item.username}</h6>
												<span className="text-md font-medium" style={{color: "coral"}}>
													{item.rating} rating
												</span>
												<p>{item.reviewText}</p>
											</li>
										))}
									</ul>

									<div className="container mx-auto mt-6">
										<h4 className="text-xl text-center font-medium">Leave your experience</h4>
										<form action="" onSubmit={handleSubmit} className="flex flex-col items-center">
											<div className=" w-6/12 h-9 my-4">
												<input className="border-2 border-gray-400 px-2 rounded outline-none w-full h-full" ref={reviewUser} required type="text" placeholder="Enter name..." />
											</div>

											<div className="w-6/12 mb-4 flex items-center gap-5 rating__group">
												<span onClick={() => setRating(1)} className="active:scale-125 cursor-pointer">
													1 <i className="ri-star-s-fill "></i>
												</span>
												<span onClick={() => setRating(2)} className="active:scale-125 cursor-pointer">
													2 <i className="ri-star-s-fill"></i>
												</span>
												<span onClick={() => setRating(3)} className="active:scale-125 cursor-pointer">
													3 <i className="ri-star-s-fill"></i>
												</span>
												<span onClick={() => setRating(4)} className="active:scale-125 cursor-pointer">
													4 <i className="ri-star-s-fill"></i>
												</span>
												<span onClick={() => setRating(5)} className="active:scale-125 cursor-pointer">
													5 <i className="ri-star-s-fill"></i>
												</span>
											</div>

											<div className="w-6/12">
												<textarea
													ref={reviewMessage}
													required
													rows={4}
													type="text"
													placeholder="Review Message..."
													className="w-full h-20 outline-none border-gray-400 border-2 px-2 rounded"
												/>
											</div>

											<div className="mb-4 cursor-pointer">
												<Button type="submit" backgroundColor={"bg-main"}>
													Submit
												</Button>
											</div>
										</form>
									</div>
								</div>
							</div>
						)}
					</div>

					{isProductLoading ? (
						<h1>Loading...</h1>
					) : (
						<div className="w-full">
							<h2 className="text-center mb-2">You might also like</h2>
							{similarProducts && <ProductList data={similarProducts} count={4} />}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default ProductDetails;
