import React, {useEffect, useRef, useState} from "react";
import Helmet from "../components/Layout/Helmet";
import {TextField} from "@mui/material";
import Button from "../components/common/Button";
import {Link, Navigate} from "react-router-dom";
import {validationSchema} from "../utils/validationSchema";
import {parceYupError} from "../utils/parceYupError";
import {fetchAuthRegister, selectIsAuth} from "../store/slices/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import axios from "../axios";

const SignUp = () => {
	const [data, setData] = useState({
		username: "",
		email: "",
		password: "",
		image: "",
	});

	const isAuth = useSelector(selectIsAuth);
	const {handleSubmit} = useForm();
	const [errors, setErrors] = useState({});
	const dispatch = useDispatch();
	const isValid = Object.keys(errors).length === 0;

	const onSubmit = async () => {
		if (isValid) {
			const req = await dispatch(fetchAuthRegister(data));
			if (!req.payload) {
				return alert("Не удалось авторизоваться!");
			}
			if ("refreshToken" in req.payload) {
				window.localStorage.setItem("refresh_token", req.payload.refreshToken);
				window.localStorage.setItem("access_token", req.payload.accessToken);
			}
		} else {
			console.log("Ошибка регистрации");
		}
	};

	const handleChange = (e) => {
		const {value, name} = e.target;
		setData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

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
			const {data} = await axios.post("/avatars", formData);
			const filename = data.url.split(".")[0].split("/").pop();
			setData((prevState) => ({
				...prevState,
				image: filename,
			}));
		} catch (e) {
			console.log(e.response.data);
			toast.error("Error uploading");
		}
	};

	useEffect(() => {
		validationSchema
			.validate(data, {abortEarly: false})
			.then(() => setErrors({}))
			.catch((yupError) => {
				const errors = parceYupError(yupError);
				setErrors(errors);
			});
	}, [data]);

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<Helmet title="Signup">
			<section className="px-1 py-12">
				<div className="container mx-auto">
					<div className="flex items-center justify-center">
						<div className="w-6/12">
							<h3 className="font-semibold mb-4 text-2xl text-center">Signup</h3>
							<form className="flex flex-col gap-4 items-center px-10 rounded-lg py-3" onSubmit={handleSubmit(onSubmit)}>
								<TextField
									fullWidth
									margin="dense"
									type="text"
									placeholder="username"
									value={data.username}
									onChange={handleChange}
									error={Boolean(errors.username)}
									helperText={errors.username}
									name="username"
								/>

								<TextField
									fullWidth
									margin="dense"
									type="email"
									placeholder="Enter your email"
									value={data.email}
									onChange={handleChange}
									error={Boolean(errors.email)}
									helperText={errors.email}
									name="email"
								/>

								<TextField
									fullWidth
									margin="dense"
									type="password"
									placeholder="Enter your password"
									error={Boolean(errors.password)}
									helperText={errors.password}
									onChange={handleChange}
									name="password"
								/>

								{/* <TextField margin="normal" id="image" type="file" onChange={handleChangeFile} /> */}

								<Button backgroundColor={"bg-main"}>Create an Account</Button>

								<p>
									Already have an account?{" "}
									<Link className="text-gray-500 font-medium" to="/login">
										Login
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</Helmet>
	);
};

export default SignUp;
