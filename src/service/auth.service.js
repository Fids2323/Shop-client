import axios from "axios";
import config from "../config.json";

const authEndpoint = "auth";

const authService = {
	login: async (credentials) => {
		try {
			const {data} = await axios.post(`${config.apiEndpoint}/${authEndpoint}/signInWithPassword`, credentials);
			console.log(credentials);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to login");
		}
	},
	logout: async () => {
		try {
			const {data} = await axios.post(`${config.apiEndpoint}/${authEndpoint}/logout`);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to logout");
		}
	},
	getCurrentUser: async () => {
		try {
			const {data} = await axios.get(`${config.apiEndpoint}/${authEndpoint}/me`);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to get current user");
		}
	},
	refreshToken: async () => {
		try {
			const {data} = await axios.post(`${config.apiEndpoint}/${authEndpoint}/refresh`);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to refresh token");
		}
	},
};

export default authService;
