import { Link } from "react-router";
import { constants } from "../../../../setup/constants";

function Header() {
	return (
		<header className="header">
			<Link to={constants.ROUTE_HOME} className="header-logo">
				{constants.APP_NAME}
			</Link>
			<nav className="header-nav">
				<Link to={constants.ROUTE_HOME} className="header-nav-link">
					Accueil
				</Link>
			</nav>
		</header>
	);
}

export default Header;
