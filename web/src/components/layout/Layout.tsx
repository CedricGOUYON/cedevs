import { Outlet } from "react-router";
import Footer from "../footer/Footer";


function Layout() {
	return (
		<div className="app-wrapper">

			<main className="main-content">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default Layout;
