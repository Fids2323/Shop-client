import {useDispatch, useSelector} from "react-redux";
import Layout from "./components/Layout/Layout";
import {useEffect} from "react";
import {fetchAuthRefresh, selectIsAuth} from "./store/slices/authSlice";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);
	const refresh_token = window.localStorage.getItem("refresh_token");

	useEffect(() => {
		dispatch(fetchAuthRefresh({refresh_token: `${refresh_token}`}));
	}, []);
	return (
		<>
			<Layout />
			<ToastContainer autoClose={2000} theme="colored" newestOnTop={true} />
		</>
	);
}

export default App;
