import axios from "axios";

export const baseURL = " http://localhost:8080/api";

const instance = axios.create({
	baseURL,
});

instance.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${window.localStorage.getItem("access_token")}`;
	return config;
});

export default instance;
