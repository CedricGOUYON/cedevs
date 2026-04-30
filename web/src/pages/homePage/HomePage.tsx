import { useState } from "react";
import { Link } from "react-router";
import { constants } from "../../../../setup/constants";
import "./HomePage.css";

interface Module {
	id: string;
	title: string;
	description: string;
}

interface Chapter {
	id: string;
	title: string;
	desc: string;
	modules: Module[];
}

const chapters: Chapter[] = [
	{
		id: "01",
		title: "Monorepo & Structure",
		desc: "npm workspaces, TypeScript strict, Biome, structure packages web/mobile/backend/shared.",
		modules: [
			{
				id: "t-01",
				title: "Création d'un monorepo",
				description: "Initialisation de la structure monorepo avec npm workspaces",
			},
			{
				id: "t-02",
				title: "Structure frontend",
				description: "Configuration React avec Router, Layout et pages",
			},
			{
				id: "t-03",
				title: "Structure backend",
				description: "Serveur Express avec routes et contrôleurs",
			},
		],
	},
	{
		id: "02",
		title: "Base de données",
		desc: "PostgreSQL + migrations SQL, modèles typés, query builder.",
		modules: [
			{
				id: "t-04",
				title: "Base de données",
				description: "Configuration PostgreSQL et migrations",
			},
		],
	},
	{
		id: "03",
		title: "Authentification",
		desc: "Inscription, connexion JWT, sessions, OAuth GitHub, routes protégées.",
		modules: [
			{
				id: "t-05",
				title: "Inscription",
				description: "Système d'enregistrement utilisateur avec validation",
			},
			{
				id: "t-06",
				title: "Connexion",
				description: "Authentification avec JWT et sessions",
			},
			{
				id: "t-07",
				title: "Logout et session",
				description: "Gestion de la déconnexion et des sessions",
			},
			{
				id: "t-08",
				title: "Routes protégées",
				description: "Middleware de protection et redirection",
			},
			{
				id: "t-18",
				title: "GitHub OAuth",
				description: "Authentification via GitHub",
			},
		],
	},
	{
		id: "04",
		title: "CRUD & Profils",
		desc: "Dashboard utilisateur, édition profil, upload avatar, pagination.",
		modules: [
			{
				id: "t-09",
				title: "Dashboard",
				description: "Page d'accueil utilisateur connecté",
			},
			{
				id: "t-10",
				title: "Profil et édition",
				description: "Page de profil avec formulaire d'édition",
			},
			{
				id: "t-11",
				title: "Upload avatar",
				description: "Téléchargement et stockage d'images",
			},
			{
				id: "t-12",
				title: "Read (CRUD)",
				description: "Lecture des données avec pagination",
			},
			{
				id: "t-13",
				title: "Create (CRUD)",
				description: "Création de nouvelles ressources",
			},
			{
				id: "t-14",
				title: "Update (CRUD)",
				description: "Modification des ressources existantes",
			},
			{
				id: "t-15",
				title: "Delete (CRUD)",
				description: "Suppression sécurisée des ressources",
			},
		],
	},
	{
		id: "05",
		title: "Emails & Paiements",
		desc: "Nodemailer, Stripe Checkout, abonnements récurrents, webhooks.",
		modules: [
			{
				id: "t-16",
				title: "Emails transactionnels",
				description: "Envoi d'emails avec Nodemailer",
			},
			{
				id: "t-17",
				title: "Stripe Checkout",
				description: "Intégration du paiement Stripe",
			},
			{
				id: "t-26",
				title: "Stripe Billing",
				description: "Facturation récurrente avec Stripe",
			},
			{
				id: "t-27",
				title: "Webhook Stripe",
				description: "Gestion des événements Stripe",
			},
		],
	},
	{
		id: "06",
		title: "Déploiement",
		desc: "Backend, base de données et frontend sur Render.",
		modules: [
			{
				id: "t-19",
				title: "Déploiement Backend",
				description: "Déployer sur Render",
			},
			{
				id: "t-20",
				title: "Déploiement BD",
				description: "PostgreSQL sur Render",
			},
			{
				id: "t-21",
				title: "Déploiement Frontend",
				description: "Frontend sur Render",
			},
		],
	},
	{
		id: "07",
		title: "Rôles & Organisations",
		desc: "RBAC, organisations multi-users, permissions granulaires, plans.",
		modules: [
			{
				id: "t-22",
				title: "Système de rôles",
				description: "RBAC - Contrôle d'accès basé sur les rôles",
			},
			{
				id: "t-23",
				title: "Organisations et Teams",
				description: "Gestion d'organisations multi-utilisateurs",
			},
			{
				id: "t-24",
				title: "Permissions granulaires",
				description: "Système de permissions fines",
			},
			{
				id: "t-25",
				title: "Plans et limites",
				description: "Gestion des plans d'abonnement",
			},
		],
	},
	{
		id: "08",
		title: "Expérience utilisateur",
		desc: "Onboarding, notifications in-app, audit log, admin panel.",
		modules: [
			{
				id: "t-28",
				title: "Onboarding",
				description: "Tutoriel de premiers pas",
			},
			{
				id: "t-29",
				title: "Notifications in-app",
				description: "Système de notifications temps réel",
			},
			{
				id: "t-30",
				title: "Audit log",
				description: "Historique des actions utilisateur",
			},
			{
				id: "t-31",
				title: "Admin panel",
				description: "Interface d'administration",
			},
			{ id: "t-32", title: "Analytics", description: "Suivi et statistiques" },
			{
				id: "t-33",
				title: "Rate limiting",
				description: "Protection contre les abus",
			},
		],
	},
	{
		id: "09",
		title: "CMS & Blog",
		desc: "Éditeur rich text, articles, SEO, slugs, multi-langue, prévisualisation.",
		modules: [
			{
				id: "t-34",
				title: "Structure CMS",
				description: "Configuration du système de contenu",
			},
			{
				id: "t-35",
				title: "Éditeur rich text",
				description: "Éditeur WYSIWYG pour contenu",
			},
			{
				id: "t-36",
				title: "Articles et Blog",
				description: "Gestion du blog et articles",
			},
			{
				id: "t-37",
				title: "Pages statiques",
				description: "Gestion des pages statiques",
			},
			{
				id: "t-38",
				title: "Médias et uploads",
				description: "Gestion des images et fichiers",
			},
			{
				id: "t-39",
				title: "Catégories et Tags",
				description: "Organisation du contenu",
			},
			{
				id: "t-40",
				title: "SEO et Slugs",
				description: "Optimisation pour les moteurs de recherche",
			},
			{
				id: "t-41",
				title: "Multi-langue",
				description: "Support de plusieurs langues",
			},
			{
				id: "t-42",
				title: "Prévisualisation",
				description: "Aperçu avant publication",
			},
		],
	},
];

const stack = [
	{ name: "React 18", cat: "Web", color: "#61DAFB" },
	{ name: "React Native", cat: "Mobile", color: "#61DAFB" },
	{ name: "Expo", cat: "Mobile", color: "#1B1B1B" },
	{ name: "TypeScript", cat: "Language", color: "#3178C6" },
	{ name: "Vite", cat: "Build", color: "#646CFF" },
	{ name: "React Router 7", cat: "Routing", color: "#F44250" },
	{ name: "Express", cat: "Backend", color: "#68A063" },
	{ name: "PostgreSQL", cat: "Database", color: "#336791" },
	{ name: "JWT", cat: "Auth", color: "#D63AFF" },
	{ name: "Stripe", cat: "Payments", color: "#635BFF" },
	{ name: "Nodemailer", cat: "Email", color: "#0EA5E9" },
	{ name: "Biome", cat: "Tooling", color: "#60CFAC" },
	{ name: "Zod", cat: "Validation", color: "#F97316" },
	{ name: "Render", cat: "Deploy", color: "#46E3B7" },
];

const prereqs = [
	{
		icon: "🌐",
		label: "Google Chrome",
		note: "Navigateur principal pour le dev",
		type: "app",
	},
	{ icon: "📝", label: "VS Code", note: "Éditeur recommandé", type: "app" },
	{
		icon: "🟢",
		label: "Node.js 20+",
		note: "LTS — vérifie avec node --version",
		type: "cmd",
	},
	{ icon: "📦", label: "pnpm", note: "npm install -g pnpm", type: "cmd" },
	{ icon: "🔀", label: "Git", note: "Vérifie avec git --version", type: "cmd" },
	{
		icon: "🐳",
		label: "Docker Desktop",
		note: "Pour PostgreSQL en local",
		type: "app",
	},
	{
		icon: "🐘",
		label: "PostgreSQL 15+",
		note: "Via Docker ou installation directe",
		type: "cmd",
	},
	{
		icon: "🗄️",
		label: "TablePlus",
		note: "Client GUI pour la base de données",
		type: "app",
	},
	{
		icon: "📐",
		label: "Biome",
		note: "Extension VS Code — linting & formatting",
		type: "ext",
	},
];

function ChapterAccordion({ chapter }: { chapter: Chapter }) {
	const [open, setOpen] = useState(false);

	return (
		<article className={`hp-chapter ${open ? "hp-chapter--open" : ""}`}>
			<header>
				<button className="hp-chapter__trigger" onClick={() => setOpen(!open)} type="button" aria-expanded={open} aria-controls={`chapter-${chapter.id}`}>
					<span className="hp-chapter__num">{chapter.id}</span>
					<div className="hp-chapter__header-info">
						<h3>{chapter.title}</h3>
						<p>{chapter.desc}</p>
					</div>
					<div className="hp-chapter__header-actions">
						<span className="hp-chapter__count">
							{chapter.modules.length} module
							{chapter.modules.length > 1 ? "s" : ""}
						</span>
						<span className="hp-chapter__chevron">{open ? "▲" : "▼"}</span>
					</div>
				</button>
			</header>
			{open && (
				<section id={`chapter-${chapter.id}`} className="hp-chapter__content">
					{chapter.modules.map((module) => (
						<article className="hp-module" key={module.id}>
							<span className="hp-module__id">{module.id}</span>
							<div className="hp-module__info">
								<h4>{module.title}</h4>
								<p>{module.description}</p>
							</div>
						</article>
					))}
				</section>
			)}
		</article>
	);
}

function HomePage() {
	const totalModules = chapters.reduce((acc, p) => acc + p.modules.length, 0);

	return (
		<main className="hp-home">
			{/* HERO SECTION */}
			<section className="hp-hero">
				<div className="hp-hero__noise" aria-hidden="true" />
				<div className="hp-hero__grid" aria-hidden="true" />
				<header className="hp-hero__inner">
					<span className="hp-badge">{constants.APP_NAME} · Monorepo · Web · Mobile · Full-stack</span>
					<h1 className="hp-hero__title">
						<span className="hp-hero__title-accent">{constants.APP_NAME}</span>
						<br />
						Le monorepo <br />
						Web & Mobile
						<br />
						dont on a besoin.
					</h1>
					<p className="hp-hero__sub">Un monorepo SaaS que tu construis toi-même, étape par étape, pour comprendre en profondeur chaque brique jusqu'à une mise en production complète.</p>
					<nav className="hp-hero__cta">
						<Link to="/register" className="hp-btn hp-btn--primary">
							Créer mon compte
						</Link>
						<a href="#steps" className="hp-btn hp-btn--ghost">
							Voir les étapes
						</a>
					</nav>
					<dl className="hp-hero__stats">
						<div className="hp-stat">
							<dt className="hp-stat__lbl">Fiches</dt>
							<dd className="hp-stat__num">{totalModules}</dd>
						</div>
						<span className="hp-stat__sep" aria-hidden="true" />
						<div className="hp-stat">
							<dt className="hp-stat__lbl">Chapitres</dt>
							<dd className="hp-stat__num">{chapters.length}</dd>
						</div>
						<span className="hp-stat__sep" aria-hidden="true" />
						<div className="hp-stat">
							<dt className="hp-stat__lbl">Codebase</dt>
							<dd className="hp-stat__num">1</dd>
						</div>
					</dl>
				</header>
			</section>

			{/* ABOUT SECTION */}
			<section className="hp-about">
				<header className="hp-section-inner">
					<p className="hp-eyebrow">C'est quoi {constants.APP_NAME} ?</p>
					<h2>Pas un template. Un parcours complet.</h2>
				</header>
				<div className="hp-section-inner">
					<div className="hp-about__text">
						<p>{constants.APP_NAME} est un monorepo SaaS construit brique par brique, en suivant une progression structurée et logique. Chaque module guide l'implémentation complète du code jusqu'à son intégration dans l'ensemble.</p>
						<p>L'objectif n'est pas uniquement d'écrire du code, mais de comprendre comment chaque couche s'articule (frontend, backend, base de données, infrastructure) et pourquoi elle est conçue ainsi.</p>
						<p>Au fil des chapitres, une application SaaS complète est construite : authentification sécurisée, gestion des données, paiements Stripe, rôles et permissions, CMS et déploiement en production. Chaque élément est conçu pour fonctionner ensemble dans un environnement réel.</p>
						<p>
							À la fin du parcours, une base SaaS propre, structurée et éprouvée est obtenue, avec un launcher unique simulant un environnement de production en local (Docker, base de données, build, serveur) afin de garantir un contexte cohérent du début à la fin. Un vérificateur valide l'intégrité complète du
							monorepo avec génération d'un rapport d'audit.
						</p>
						<p>Le monorepo {constants.APP_NAME} est directement réutilisable et s'adapte immédiatement à de futurs projets.</p>
					</div>
					<div className="hp-about__cards">
						{[
							{
								icon: "🏗️",
								title: "Architecture first",
								desc: "Monorepo npm workspaces : packages web, mobile, backend et shared typés.",
							},
							{
								icon: "🔐",
								title: "Auth prod-ready",
								desc: "JWT, sessions, OAuth GitHub, routes protégées, RBAC.",
							},
							{
								icon: "💳",
								title: "Stripe intégré",
								desc: "Checkout, abonnements récurrents, webhooks et gestion de plans.",
							},
							{
								icon: "🚀",
								title: "Deploy dès le départ",
								desc: "Render pour le backend, la BD et le frontend. CI prête à l'emploi.",
							},
						].map((c) => (
							<article className="hp-feature-card" key={c.title}>
								<span className="hp-feature-card__icon" aria-hidden="true">
									{c.icon}
								</span>
								<h3>{c.title}</h3>
								<p>{c.desc}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			{/* PROGRAM SECTION */}
			<section className="hp-steps" id="steps">
				<header className="hp-section-inner">
					<p className="hp-eyebrow">Roadmap</p>
					<h2>Le programme</h2>
					<p className="hp-steps__sub">
						{totalModules} modules regroupés en {chapters.length} chapitres. Clique sur un chapitre pour voir le contenu.
					</p>
				</header>
				<div className="hp-section-inner">
					<div className="hp-chapters">
						{chapters.map((chapter) => (
							<ChapterAccordion key={chapter.id} chapter={chapter} />
						))}
					</div>
				</div>
			</section>

			{/* PREREQUISITES SECTION */}
			<section className="hp-prereq">
				<div className="hp-section-inner hp-section-inner--narrow">
					<header>
						<p className="hp-eyebrow">Avant de commencer</p>
						<h2>Installation requise</h2>
					</header>
					<dl className="hp-prereq__grid">
						{prereqs.map((p) => (
							<div className="hp-prereq__item" key={p.label}>
								<dt className="hp-prereq__label">
									<span className="hp-prereq__icon" aria-hidden="true">
										{p.icon}
									</span>
									<span className="hp-prereq__name">{p.label}</span>
								</dt>
								<dd className="hp-prereq__description">{p.note}</dd>
								<span className={`hp-prereq__tag hp-prereq__tag--${p.type}`}>{p.type === "cmd" ? "CLI" : p.type === "ext" ? "Extension" : "App"}</span>
							</div>
						))}
					</dl>
					<aside className="hp-prereq__note">
						<p>
							Le reste est fourni dans le monorepo ou accessible en ligne.
							<br /> <br />
							Ce monorepo est optimisé pour un environnement Windows.
							<br /> <br />
							Certaines fonctionnalités peuvent avoir un comportement différent ou ne pas être fonctionnelles sur macOS/Linux.
						</p>
					</aside>
				</div>
			</section>

			{/* TECH STACK SECTION */}
			<section className="hp-stack">
				<div className="hp-section-inner">
					<header>
						<p className="hp-eyebrow">Stack technique</p>
						<h2>Des technos qui tiennent en production</h2>
					</header>
					<ul className="hp-stack__grid">
						{stack.map((s) => (
							<li key={s.name}>
								<span className="hp-stack__pill" style={{ "--accent": s.color } as React.CSSProperties}>
									<span className="hp-stack__pill-cat">{s.cat}</span>
									<span className="hp-stack__pill-name">{s.name}</span>
								</span>
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* CTA FINAL SECTION */}
			<section className="hp-cta">
				<div className="hp-cta__noise" aria-hidden="true" />
				<div className="hp-section-inner hp-section-inner--narrow hp-cta__inner">
					<header>
						<h2>Commencer la construction dès maintenant.</h2>
						<p>Créer un compte pour accéder à l'ensemble des modules de construction, suivre la progression et recevoir les mises à jour.</p>
					</header>
					<nav>
						<Link to="/register" className="hp-btn hp-btn--primary hp-btn--lg">
							Créer un compte
						</Link>
					</nav>
					<small className="hp-cta__fine">Inscription gratuite. Sans carte bancaire. Et pour toujours.</small>
				</div>
			</section>
		</main>
	);
}

export default HomePage;
