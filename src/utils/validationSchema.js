import * as yup from "yup";

export const validationSchema = yup.object().shape({
	username: yup
		.string()
		.required("Username is required")
		.min(3, "Minimum length - 3 characters")
		.max(15, "Maximum length - 15 characters")
		.matches(/^[a-zA-Z]+$/, "Use only letters, no spaces"),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.min(8, "Password must be at least 8 characters")
		.matches(/(?=.*[A-Z])/, "Password must contain at least one capital letter")
		.matches(/(?=.*[0-9])/, "Password must contain at least one number")
		.matches(/(?=.*[!@#$%^&*])/, "Password must contain one of the special characters !@#$%^&*")
		.required("Password is required"),
});
