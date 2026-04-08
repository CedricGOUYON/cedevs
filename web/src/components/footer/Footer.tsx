import { constants } from "../../../../setup/constants";

function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="footer">
			<strong>{constants.APP_NAME}</strong>
			<p>monorepo web et mobile</p>
			<p>© {year}</p>
		</footer>
	);
}

export default Footer;
