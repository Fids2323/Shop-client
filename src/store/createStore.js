import {combineReducers, configureStore} from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productsSlice";
import authReducer from "./slices/authSlice";

const rootReducers = combineReducers({
	cart: cartReducer,
	product: productReducer,
	auth: authReducer,
});

export function createStore() {
	return configureStore({
		reducer: rootReducers,
	});
}
