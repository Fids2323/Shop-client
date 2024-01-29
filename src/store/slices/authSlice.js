import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
	const {data} = await axios.post("/auth/signInWithPassword", params);
	console.log(data);

	return data;
});

export const fetchAuthRefresh = createAsyncThunk("auth/fetchAuthRefresh", async (params) => {
	const {data} = await axios.post("/auth/token", params);
	if ("refreshToken" in data) {
		window.localStorage.setItem("refresh_token", data.refreshToken);
		window.localStorage.setItem("access_token", data.accessToken);
	}
	return data;
});

export const fetchAuthRegister = createAsyncThunk("auth/fetchAuthRegister", async (params) => {
	const {data} = await axios.post("/auth/signUp", params);
	return data;
});

const initialState = {
	data: null,
	status: "loading",
	role: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null;
		},
	},
	extraReducers: {
		[fetchAuth.pending]: (state) => {
			state.data = null;
			state.status = "loading";
		},
		[fetchAuth.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = "loaded";
			state.role = action.payload.role;
		},
		[fetchAuth.rejected]: (state) => {
			state.status = "error";
			state.data = null;
		},
		[fetchAuthRefresh.pending]: (state) => {
			state.data = null;
			state.status = "loading";
		},
		[fetchAuthRefresh.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = "loaded";
		},
		[fetchAuthRefresh.rejected]: (state) => {
			state.status = "error";
			state.data = null;
		},
		[fetchAuthRegister.pending]: (state) => {
			state.data = null;
			state.status = "loading";
		},
		[fetchAuthRegister.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = "loaded";
			state.role = action.payload.role;
		},
		[fetchAuthRegister.rejected]: (state) => {
			state.status = "error";
			state.data = null;
		},
	},
});

const {reducer: authReducer} = authSlice;

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const {logout} = authSlice.actions;
export default authReducer;
