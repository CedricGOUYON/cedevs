import "./NotFoundPage.css";
import { Link } from "react-router";

function NotFoundPage() {
	return (
		<main className="nf">
			<div className="nf__grid" aria-hidden="true" />
			<section className="nf__inner">
				<span className="nf__code">404</span>
				<h1 className="nf__title">Page introuvable.</h1>
				<p className="nf__sub">Cette page n'existe pas ou a été déplacée.</p>
				<nav>
					<Link to="/" className="nf__btn">
						Retour à l'accueil
					</Link>
				</nav>
			</section>
		</main>
	);
}

export default NotFoundPage;
