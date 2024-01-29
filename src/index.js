import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {createStore} from "./store/createStore";
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
			<ToastContainer theme="dark" position="top-right" autoClose={3000} closeOnClick pauseOnHover={false} />
		</BrowserRouter>
	</Provider>
);
