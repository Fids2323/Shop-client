import React, {useState} from "react";
import Helmet from "../components/Layout/Helmet";
import {TextField} from "@mui/material";
import Button from "../components/common/Button";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth, selectIsAuth} from "../store/slices/authSlice";
import {Navigate} from "react-router-dom";

const LoginPage = () => {
	const isAuth = useSelector(selectIsAuth);
	const {
		register,
		handleSubmit,
		setError,
		formState: {errors, isValid},
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});
	const dispatch = useDispatch();

	const onSubmit = async (values) => {
		console.log(values);
		const data = await dispatch(fetchAuth(values));
		console.log(data.payload);

		if (!data.payload) {
			return alert("Не удалось авторизоваться!");
		}
		if ("refreshToken" in data.payload) {
			window.localStorage.setItem("refresh_token", data.payload.refreshToken);
			window.localStorage.setItem("access_token", data.payload.accessToken);
			window.localStorage.setItem("role", data.payload.role);
		}
	};

	if (isAuth) {
		return <Navigate to="/" />;
	}

	return (
		<Helmet title="Login">
			<section className="px-1 py-12">
				<div className="container mx-auto">
					<div className="flex items-center justify-center">
						<div className="w-6/12">
							<h3 className="font-semibold mb-4 text-2xl text-center">Login</h3>
							<form className="flex flex-col gap-4 items-center px-10 rounded-lg py-3 " onSubmit={handleSubmit(onSubmit)}>
								<TextField
									fullWidth
									margin="dense"
									placeholder="Enter your email"
									error={Boolean(errors.email?.message)}
									helperText={errors.email?.message}
									{...register("email", {required: "Укажите почту"})}
								/>

								<TextField
									fullWidth
									margin="dense"
									placeholder="Enter your password"
									{...register("password", {required: "Укажите пароль"})}
									error={Boolean(errors.password?.message)}
									helperText={errors.password?.message}
								/>

								<Button backgroundColor={"bg-main"}>Login</Button>

								<p>
									Don't have an account?{" "}
									<Link className="text-gray-500 font-medium" to="/signup">
										Create an account
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

export default LoginPage;
