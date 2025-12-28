import { useNavigate } from "react-router";
import Header from "../../components/header/Header";
import "./NotFoundPage.css";

function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<div className="not-found-page">
			<Header />
			<h1>404 - Page non trouvée</h1>
			<button type="button" onClick={() => navigate("/")}>
				Retour à l'accueil
			</button>
		</div>
	);
}

export default NotFoundPage;
