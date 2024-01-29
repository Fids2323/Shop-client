import React, {useEffect, useState} from "react";
import axios from "../../axios";
import {Pagination} from "@mui/material";
import {paginate} from "../../utils/paginate";

const AllOrders = () => {
	const [ordersData, setOrdersData] = useState([]);
	const [orders, setOrders] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const {data} = await axios.get("/order");
				setOrders(data);
				setOrdersData(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const handlePageChange = (event, value) => {
		setPage(value);
	};

	const handleSearch = (event) => {
		const query = event.target.value;
		setSearchQuery(query);
		const filteredUsers = ordersData.filter((user) => user.email.toLowerCase().includes(query.toLowerCase()));
		setOrders(filteredUsers);
		setPage(1);
	};

	const pageSize = 10;
	const pageCount = Math.ceil(orders.length / pageSize);

	const sliceData = paginate(orders, page, pageSize);

	return (
		<section className="py-8">
			<div className="container mx-auto">
				<div className="flex flex-col gap-8">
					<div className="w-12/12 lg:w-6/12 flex items-center justify-center border-2 border-main rounded px-2">
						<input type="text" placeholder="Search..." onChange={handleSearch} value={searchQuery} className="outline-none w-full h-full" />
						<span className="cursor-pointer text-xl active:scale-110">
							<i className="ri-search-line "></i>
						</span>
					</div>
					<div className="w-full text-2xl font-semibold text-center"> Users Table</div>

					<div className="w-full">
						<table className="w-full  text-center">
							<thead className="border-b-2 border-main">
								<tr>
									<th className="w-1/12">Name</th>
									<th className="w-2/12">Email</th>
									<th className="w-2/12">Phone</th>
									<th className="w-6/12">Products</th>
									<th className="w-1/12">Total</th>
								</tr>
							</thead>
							<tbody>
								{sliceData.map((item) => (
									<tr key={item._id} className="h-16 border-b-2">
										<td>{item.name}</td>
										<td>{item.email}</td>
										<td>{item.phone}</td>
										<td
											className="flex 
										flex-col"
										>
											{item.products.map((product, index) => (
												<div className=" flex justify-between px-8" key={index}>
													<span>{product.title}</span>
													<span>{product.quantity}</span>
												</div>
											))}
										</td>
										<td>${item.total}</td>
									</tr>
								))}
							</tbody>
						</table>

						<div className="container mx-auto flex items-center justify-center h-16">
							<Pagination count={pageCount} page={page} onChange={handlePageChange} shape="rounded" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AllOrders;
