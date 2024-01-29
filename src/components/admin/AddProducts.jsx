import {Box, FormControl, InputLabel, NativeSelect, TextField} from "@mui/material";
import React, {useState} from "react";
import Button from "../common/Button";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import axios from "../../axios.js";
import {toast} from "react-toastify";

const AddProducts = () => {
	const [createTitle, setCreateTitle] = useState("");
	const [createShortDesc, setCreateShortDesc] = useState("");
	const [createDescription, setCreateDescription] = useState("");
	const [createCategory, setCreateCategory] = useState("mobile");
	const [createPrice, setCreatePrice] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	const {handleSubmit} = useForm();
	const dispatch = useDispatch();

	const handleChangeFile = async (e) => {
		try {
			const allowedExtensions = /(\.jpg)$/i;
			const formData = new FormData();
			const file = e.target.files[0];
			if (!allowedExtensions.exec(file.name)) {
				toast.error("Only jpg files");
				return;
			}
			formData.append("image", file);
			const {data} = await axios.post("/uploads", formData);
			const filename = data.url.split(".")[0].split("/").pop();
			setImageUrl(filename);
		} catch (e) {
			console.warn(e);
			toast.error("Error uploading");
		}
	};

	const onSubmit = async (e) => {
		try {
			const fields = {
				title: createTitle,
				imgUrl: imageUrl,
				category: createCategory,
				price: +createPrice,
				shortDesc: createShortDesc,
				description: createDescription,
				reviews: [],
				avgRating: 4.9,
			};

			const {data} = await axios.post("/products", fields);
			console.log(data);
			toast.success("Success");
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<section className="px-1 py-10">
			<div className="container mx-auto">
				<div className="flex">
					<div className="w-12/12 flex-col">
						<h4 className="mb-6 text-xl font-semibold">Add product</h4>
						<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
							<TextField margin="dense" id="title" label="Title" type="text" value={createTitle} onChange={(e) => setCreateTitle(e.target.value)} required />

							<TextField margin="dense" id="shortDesc" label="Short Description" type="text" value={createShortDesc} onChange={(e) => setCreateShortDesc(e.target.value)} required />

							<TextField margin="dense" id="description" label="Description" type="text" value={createDescription} onChange={(e) => setCreateDescription(e.target.value)} required />

							<TextField margin="normal" id="price" label="Price" type="number" value={createPrice} onChange={(e) => setCreatePrice(e.target.value)} required />

							<Box sx={{minWidth: 120}}>
								<FormControl fullWidth margin="normal">
									<InputLabel variant="standard" margin="dense" htmlFor="uncontrolled-native"></InputLabel>
									<NativeSelect
										inputProps={{
											name: "category",
											id: "controlled-native",
										}}
										value={createCategory}
										onChange={(e) => setCreateCategory(e.target.value)}
									>
										<option value={"mobile"}>Mobile</option>
										<option value={"clock"}>Clock</option>
										<option value={"video card"}>Video card</option>
										<option value={"laptop"}>Laptop</option>
									</NativeSelect>
								</FormControl>
							</Box>

							<TextField margin="normal" id="imgUrl" type="file" onChange={handleChangeFile} required />

							<Button backgroundColor={"bg-main"}>Add product</Button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AddProducts;
