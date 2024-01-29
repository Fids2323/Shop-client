import React, {useEffect, useState} from "react";
import axios from "../../axios";
import {Pagination} from "@mui/material";
import {paginate} from "../../utils/paginate";

const AllUsers = () => {
	const [usersData, setUsersData] = useState([]);
	const [users, setUsers] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const {data} = await axios.get("/user");
				setUsers(data);
				setUsersData(data);
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
		const filteredUsers = usersData.filter((user) => user.username.toLowerCase().includes(query.toLowerCase()));
		setUsers(filteredUsers);
		setPage(1);
	};

	const pageSize = 10;
	const pageCount = Math.ceil(users.length / pageSize);

	const sliceData = paginate(users, page, pageSize);

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
							<thead className="border-b-2">
								<tr>
									<th>Username</th>
									<th>Email</th>
									<th>_id</th>
								</tr>
							</thead>
							<tbody>
								{sliceData.map((item) => (
									<tr key={item._id} className="h-12">
										<td>{item.username}</td>
										<td>{item.email}</td>
										<td>${item._id}</td>
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

export default AllUsers;
