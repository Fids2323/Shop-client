import axios from "axios";

export const baseURL = "https://backend-bu1x.onrender.com/api";

const instance = axios.create({
	baseURL,
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${window.localStorage.getItem("access_token")}`;
	return config;
});

export default instance;
