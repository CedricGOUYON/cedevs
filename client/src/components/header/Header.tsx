import "./Header.css";
import { constants } from "../../../../setup/constants";

function Header() {
	return (
		<header className="header">
			<div className="left-side">
				<h1>{constants.APP_NAME}</h1>
			</div>
		</header>
	);
}

export default Header;
