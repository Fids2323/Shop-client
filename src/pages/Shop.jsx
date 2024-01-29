import React, {useEffect, useState} from "react";
import Helmet from "../components/Layout/Helmet";
import ProductList from "../components/ui/ProductList";
import {Pagination} from "@mui/material";
import {paginate} from "../utils/paginate";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../store/slices/productsSlice";

const Shops = () => {
	const [productsData, setProductsData] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [page, setPage] = useState(1);
	const pageSize = 8;

	const {products, status} = useSelector((state) => state.product);

	const dispatch = useDispatch();
	const isProductLoading = status === "loading";

	useEffect(() => {
		if (status === "loading") {
			dispatch(fetchProducts());
		} else if (status === "loaded") {
			setProductsData(products);
		}
	}, [dispatch, status, products]);

	const handleFilter = ({target}) => {
		if (target.value !== "all") {
			const filteredProducts = products.filter((product) => product.category === target.value);
			setSelectedCategory(target.value);
			setProductsData(filteredProducts);
			setPage(1);
		} else {
			setSelectedCategory(target.value);
			setProductsData(products);
			setPage(1);
		}
	};

	const handleSearch = (event) => {
		const query = event.target.value;
		setSearchQuery(query);
		const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()));
		setProductsData(filteredProducts);
		setSelectedCategory("");
		setPage(1);
	};

	const handleSort = ({target}) => {
		if (target.value === "ascending") {
			setProductsData((prevProductsData) => [...prevProductsData].sort((a, b) => (a.price > b.price ? 1 : b.price > a.price ? -1 : 0)));
		} else if (target.value === "descending") {
			setProductsData((prevProductsData) => [...prevProductsData].sort((a, b) => (a.price < b.price ? 1 : b.price < a.price ? -1 : 0)));
		}
		setPage(1);
	};

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const pageCount = Math.ceil(productsData.length / pageSize);

	const sliceData = paginate(productsData, page, pageSize);

	return (
		<Helmet title="Shop">
			{isProductLoading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<div className="h-44 bg-main flex items-center justify-center">
						<h2 className="text-main font-semibold text-white">Products</h2>
					</div>

					<section className="pt-4">
						<div className="container mx-auto px-1">
							<div className="flex flex-wrap gap-4 md:flex-row md:flex-nowrap md:gap-1">
								<div className="w-6/12 lg:w-3/12">
									<select onChange={handleFilter} value={selectedCategory} className="border-2 border-main rounded py-2 px-5 outline-none cursor-pointer">
										<option value="all">All category</option>
										<option value="laptop">Laptop</option>
										<option value="mobile">Mobile</option>
										<option value="video card">Video card</option>
										<option value="clock">Clock</option>
									</select>
								</div>

								<div className="w-6/12 lg:w-3/12 ">
									<select className="py-2 px-5 border-main border-2 rounded outline-none cursor-pointer" onChange={handleSort}>
										<option>Sort By</option>
										<option value="ascending">Ascending</option>
										<option value="descending">Descending</option>
									</select>
								</div>

								<div className="w-12/12 lg:w-6/12 flex items-center justify-center border-2 border-main rounded px-2">
									<input type="text" placeholder="Search..." onChange={handleSearch} value={searchQuery} className="outline-none w-full h-full" />
									<span className="cursor-pointer text-xl active:scale-110">
										<i className="ri-search-line "></i>
									</span>
								</div>
							</div>
						</div>
					</section>

					<section className="mb-4">
						<div className="container pt-5 pb-4 mx-auto">
							<div className="lg:w-full flex items-center justify-center text-center">
								<ProductList data={sliceData} />
							</div>
						</div>
					</section>

					<div className="container mx-auto flex items-center justify-center h-16">
						<Pagination count={pageCount} page={page} onChange={handlePageChange} shape="rounded" />
					</div>
				</>
			)}
		</Helmet>
	);
};

export default Shops;
