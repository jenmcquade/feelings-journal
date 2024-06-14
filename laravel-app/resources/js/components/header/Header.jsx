import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeUserContext } from "../../actions/auth";
import { setLoadingContext } from "../../actions/api";
import { useDispatch } from "react-redux";
import { logout } from "../../api/auth";

function Header() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.user);
	const loading = useSelector(state => state.auth.loading);

	const handleLogout = async () => {
		try {
			dispatch(setLoadingContext(true));
			await logout();
			dispatch(removeUserContext());
		} catch (error) {
			console.error('There was an error logging out.');
		} finally {
			dispatch(setLoadingContext(false));
		}
	}

	if (loading) {
		return (
			<div className="text-white min-w-full">
				<header className="grid grid-cols-1 items-center gap-2 py-10">
					<h1 className="text-4xl font-bold text-center">Nothing More</h1>
					<p className="text-2xl font-bold text-blue-500">Loading...</p>
				</header>
			</div>
		);
	}

	return (
		<div className="text-white min-w-full">
			<header className="grid grid-cols-1 items-center gap-2 py-10">
				<h1 className="text-4xl font-bold text-center">Nothing More</h1>
				{user ? (
					<NavLink to="/" className="text-2xl font-bold text-blue-500"
						onClick={async (event) => {
							event.preventDefault();
							await handleLogout();
						}}
					>Logout</NavLink>
				) : (
					<NavLink to="/login" className="text-2xl font-bold text-blue-500">Login</NavLink>
				)}
			</header>
		</div>
	);
}

export default Header;