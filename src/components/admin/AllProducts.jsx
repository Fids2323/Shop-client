import React, {useEffect, useState} from "react";
import Button from "../common/Button";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../store/slices/productsSlice";
import {baseURL} from "../../axios";
import axios from "../../axios";
import {toast} from "react-toastify";
import {Pagination} from "@mui/material";
import {paginate} from "../../utils/paginate";

const AllProducts = () => {
	const dispatch = useDispatch();
	const {products, status} = useSelector((state) => state.product);
	const isProductLoading = status === "loading";
	const [productsData, setProductsData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [page, setPage] = useState(1);

	const handleDelete = async (id) => {
		try {
			await axios.delete(`/products/${id}`);
			toast.success("Deleted");
			const updatedProducts = products.filter((product) => product._id !== id);
			setProductsData(updatedProducts);
		} catch (e) {
			toast.error("Error deleting product");
		}
	};

	const handleSearch = (event) => {
		const query = event.target.value;
		setSearchQuery(query);
		const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()));
		setProductsData(filteredProducts);
		setPage(1);
	};

	const pageSize = 8;
	const pageCount = Math.ceil(productsData.length / pageSize);

	const sliceData = paginate(productsData, page, pageSize);

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	useEffect(() => {
		setProductsData(products);
	}, [products]);

	return (
		<section className="py-10">
			<div className="container mx-auto">
				<div className="flex flex-col gap-8">
					<div className="w-12/12 lg:w-6/12 flex items-center justify-center border-2 border-main rounded px-2">
						<input type="text" placeholder="Search..." onChange={handleSearch} value={searchQuery} className="outline-none w-full h-full" />
						<span className="cursor-pointer text-xl active:scale-110">
							<i className="ri-search-line "></i>
						</span>
					</div>

					<div className="w-full">
						{isProductLoading ? (
							<h1>Loading...</h1>
						) : (
							<table className="w-full text-center">
								<thead className="border-b-2">
									<tr>
										<th>Image</th>
										<th>Title</th>
										<th>Category</th>
										<th>Price</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{sliceData.map((item) => (
										<tr key={item._id}>
											<td>
												<img className="w-20 h-20 mx-auto" src={`${baseURL}/uploads/${item.imgUrl}.jpg`} alt={item.title} />
											</td>
											<td>{item.title}</td>
											<td>{item.category}</td>
											<td>${item.price}</td>
											<td>
												<Button backgroundColor={"bg-main"} onClick={() => handleDelete(`${item._id}`)}>
													Delete
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
						<div className="container mx-auto flex items-center justify-center h-16">
							<Pagination count={pageCount} page={page} onChange={handlePageChange} shape="rounded" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AllProducts;
