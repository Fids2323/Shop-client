import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
	const {data} = await axios.get("/products");
	return data;
});

const initialState = {
	products: [],
	status: "loading",
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchProducts.pending]: (state) => {
			state.products = [];
			state.status = "loading";
		},
		[fetchProducts.fulfilled]: (state, action) => {
			state.products = action.payload;
			state.status = "loaded";
		},
		[fetchProducts.rejected]: (state) => {
			state.status = "error";
			state.products = [];
		},
	},
});

const {reducer: productReducer} = productsSlice;

export const productsActions = productsSlice.actions;
export default productReducer;
