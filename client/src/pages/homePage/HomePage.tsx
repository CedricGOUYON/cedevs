import Header from "../../components/header/Header";
import "./HomePage.css";
import { constants } from "../../../../setup/constants";

function HomePage() {
	return (
		<div className="home-page">
			<Header />
			<h2>Bienvenue sur votre nouvelle application web</h2>

			<h1>{constants.ROOT_FOLDER_NAME}</h1>
			<p>
				sera bientôt disponible pour offrir une expérience optimale à vos
				utilisateurs.
			</p>

			<section className="tech-stack">
				<h3>Architecture & Technologies</h3>
				<ul>
					<li>
						<strong>Frontend :</strong> React, Vite, React Router, TypeScript
					</li>
					<li>
						<strong>Backend :</strong> Node.js, Express.js
					</li>
					<li>
						<strong>Base de données :</strong> PostgreSQL
					</li>
					<li>
						<strong>Déploiement :</strong> Docker, Docker Compose
					</li>
					<li>
						<strong>Hébergement :</strong> Render.com
					</li>
					<li>
						<strong>Outils & Qualité :</strong> Biome, NPM
					</li>
					<li>
						<strong>CI/CD :</strong> Git, GitHub
					</li>
				</ul>
			</section>
		</div>
	);
}

export default HomePage;
