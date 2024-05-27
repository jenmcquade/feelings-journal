import React from "react";
import ReactDOM from "react-dom/client";
import { NavLink } from "react-router-dom";

function Header() {
	return (
		<div className="text-white">
			<header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
				<NavLink to="/login" className="text-2xl font-bold text-blue-500">Login</NavLink>
			</header>
		</div>
	);
}

export default Header;