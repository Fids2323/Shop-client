import React, {useState} from "react";
import {TextField} from "@mui/material";
import Button from "../common/Button";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from "../../axios";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {cartActions} from "../../store/slices/cartSlice";

const FormOrder = () => {
	const totalAmount = useSelector((state) => state.cart.totalAmount);
	const cartItems = useSelector((state) => state.cart.cartItems);
	const userId = useSelector((state) => state.auth.data && state.auth.data.userId);
	const {handleSubmit} = useForm();
	const dispatch = useDispatch();

	const [formValue, setFormValue] = useState({
		user: userId,
		name: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		country: "",
		total: totalAmount,
		products: cartItems,
	});

	const handleChange = (e) => {
		const {value, name} = e.target;
		setFormValue((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const onSubmit = async (e) => {
		try {
			const {data} = await axios.post("/order", formValue);
			toast.success("Order successfully");
			toast.success("Expect a call");
			setFormValue({
				user: userId,
				name: "",
				email: "",
				phone: "",
				address: "",
				city: "",
				country: "",
				total: 0,
				products: [],
			});

			dispatch(cartActions.clearCart());
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<TextField fullWidth margin="dense" name="name" type="text" label="Enter your name" variant="standard" required onChange={handleChange} />
			<TextField fullWidth margin="dense" name="email" type="email" label="Enter your email" variant="standard" required value={formValue.email} onChange={handleChange} />
			<TextField fullWidth margin="dense" name="phone" type="number" label="Phone number" variant="standard" required value={formValue.phone} onChange={handleChange} />
			<TextField fullWidth margin="dense" name="address" type="text" label="Street address" variant="standard" required value={formValue.address} onChange={handleChange} />
			<TextField fullWidth margin="dense" name="city" type="text" label="City" variant="standard" required value={formValue.city} onChange={handleChange} />
			<TextField fullWidth margin="dense" name="country" type="text" label="Country" variant="standard" required value={formValue.country} onChange={handleChange} />
			<div className="text-center mt-4">
				<Button backgroundColor={"bg-main"}>Place an order</Button>
			</div>
		</form>
	);
};

export default FormOrder;
