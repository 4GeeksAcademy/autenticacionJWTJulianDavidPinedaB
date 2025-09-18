import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light ">
			<div className="container ">
				<Link className="text-decoration-none border rounded-3 px-2 content-center" to="/">
					<span className="navbar-brand mb-0 ">Autenticación JWT con Flask y React.js</span>
				</Link>
			</div>
		</nav>
	);
};