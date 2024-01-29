import axios from "axios";
import config from "../config.json";
const productEndpoint = "products";

const productService = {
	getAllProducts: async () => {
		try {
			const {data} = await axios.get(`${config.apiEndpoint}/${productEndpoint}`);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to get products");
		}
	},
	getProductById: async (productId) => {
		try {
			const {data} = await axios.get(`${config.apiEndpoint}/${productEndpoint}/${productId}`);
			return data.data;
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to get product with id ${productId}`);
		}
	},
	createProduct: async (productData) => {
		try {
			const {data} = await axios.post("products", productData);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to create product");
		}
	},
	updateProduct: async (productId, productData) => {
		try {
			const {data} = await axios.patch(`${productEndpoint}${productId}`, productData);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to update product with id ${productId}`);
		}
	},
	deleteProduct: async (productId) => {
		try {
			const {data} = await axios.delete(`${productEndpoint}${productId}`);
			return data;
		} catch (error) {
			console.error(error);
			throw new Error(`Failed to delete product with id ${productId}`);
		}
	},
};

export default productService;
