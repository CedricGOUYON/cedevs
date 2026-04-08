import { useEffect, useState } from "react";
import "./HomePage.css";

interface RealisationImage {
	src: string;
	alt: string;
	caption?: string;
}

interface RealisationSection {
	id: string;
	title: string;
	subtitle: string;
	images: RealisationImage[];
}

const realisationSections: RealisationSection[] = [
	{
		id: "Les logos",
		title: "Les logos",
		subtitle: "Identités visuelles qui marquent les esprits",
		images: [
			{ src: "/photos/Logo - Monts Plan.jpg", alt: "logo-monts-plan", caption: "Logo Monts Plan" },
			{ src: "/photos/Logo - Cote & Villa.png", alt: "logo-cote-villa", caption: "Logo Cote & Villa" },
			{ src: "/photos/Logo - Atelier Taka.png", alt: "logo-atelier-taka", caption: "Logo Atelier Taka" },
			{ src: "/photos/Logo - les petites Mains.png", alt: "logo-les-petites-mains", caption: "Logo les petites Mains" },
			{ src: "/photos/Logo - Sare Photos.png", alt: "logo-sare-photos", caption: "Logo Sare Photos" },
			{ src: "/photos/Logo - Teet Brigitte.png", alt: "logo-teet-brigitte", caption: "Logo Teet Brigitte" },
			{ src: "/photos/Logo - Uneo85.png", alt: "logo-uneo85", caption: "Logo Uneo85" },
			{ src: "/photos/Logo - Pack And Go.png", alt: "logo-pack-and-go", caption: "Logo Pack And Go" },
			{ src: "/photos/Logo - StreamFlix.png", alt: "logo-streamflix", caption: "Logo StreamFlix" },
			{ src: "/photos/Logo - Tealii.png", alt: "logo-tealii", caption: "Logo Tealii" },
			{ src: "/photos/Logo - SeanZ.png", alt: "logo-seanz", caption: "Logo SeanZ" },
		],
	},
	{
		id: "Les cartes de visite",
		title: "Les cartes de visite",
		subtitle: "Première impression inoubliable, à portée de main",
		images: [
			{ src: "/photos/Carte de visite - Cedric Gouyon.jpg", alt: "carte-visite-cedric-gouyon", caption: "Carte de visite Cédric Gouyon" },
			{ src: "/photos/Carte de visite - Cote & villa.png", alt: "carte-visite-cote-villa", caption: "Carte de visite Cote & villa" },
			{ src: "/photos/Carte de visite - Monts plan 1.jpg", alt: "carte-visite-monts-plan-1", caption: "Carte de visite Monts plan 1" },
			{ src: "/photos/Carte de visite - Monts plan 2.jpg", alt: "carte-visite-monts-plan-2", caption: "Carte de visite Monts plan 2" },
			{ src: "/photos/Carte de visite - Net Toit Mousse.png", alt: "carte-visite-net-toit-mousse", caption: "Carte de visite Net Toit Mousse" },
			{ src: "/photos/Carte de viste - Avo travaux.png", alt: "carte-viste-avo-travaux", caption: "Carte de visite Avo travaux" },
			{ src: "/photos/Carte de visite - Avo travaux - FFCT.png", alt: "carte-de-visite-avo-travaux-ffct", caption: "Carte de visite Avo travaux FFCT" },
		],
	},
	{
		id: "Les flyers",
		title: "Les flyers",
		subtitle: "Des supports print qui captivent",
		images: [
			{ src: "/photos/Flyer - Avo travaux.png", alt: "flyer-avo-travaux", caption: "Flyer Avo travaux" },
			{ src: "/photos/Flyer - Cartable - Collecte vetements.png", alt: "flyer-cartable-collecte-vetements", caption: "Flyer Cartable Collecte vetements" },
			{ src: "/photos/Flyer - Cartable - Pac 2.png", alt: "flyer-cartable-pac-2", caption: "Flyer Cartable Pac 2" },
			{ src: "/photos/Flyer - Cartable - Pac.png", alt: "flyer-cartable-pac", caption: "Flyer Cartable Pac" },
			{ src: "/photos/Flyer - Les Petites Mains - Basketball.png", alt: "flyer-les-petites-mains-basketball", caption: "Flyer Les Petites Mains Basketball" },
			{ src: "/photos/Flyer - Les Petites Mains - Financement.png", alt: "flyer-les-petites-mains-financement", caption: "Flyer Les Petites Mains Financement" },
			{ src: "/photos/Flyer - Les Petites Mains - Marche de noel.png", alt: "flyer-les-petites-mains-marche-de-noel", caption: "Flyer Les Petites Mains Marche de noel" },
			{ src: "/photos/Flyer - Les Petites Mains - Ouverture.png", alt: "flyer-les-petites-mains-ouverture", caption: "Flyer Les Petites Mains Ouverture" },
			{ src: "/photos/Flyer - Monts  Plan.png", alt: "flyer-monts-plan", caption: "Flyer Monts Plan" },
			{ src: "/photos/Flyer - Net Toit Mousse.png", alt: "flyer-net-toit-mousse", caption: "Flyer Net Toit Mousse" },
			{ src: "/photos/Flyer - Taf&co 1.png", alt: "flyer-tafco-1", caption: "Flyer Taf&co 1" },
			{ src: "/photos/Flyer - Taf&co 2.png", alt: "flyer-tafco-2", caption: "Flyer Taf&co 2" },
			{ src: "/photos/Flyer - Taf&co 3.png", alt: "flyer-tafco-3", caption: "Flyer Taf&co 3" },
			{ src: "/photos/Flyer - Uneo85 - Jeune Talents.jpg", alt: "flyer-uneo85-jeune-talents", caption: "Flyer Uneo85 Jeune Talents" },
			{ src: "/photos/Flyer - Uneo85- Job dating.png", alt: "flyer-uneo85-job-dating", caption: "Flyer Uneo85 Job dating" },
		],
	},
	{
		id: "Les couvertures",
		title: "Les couvertures",
		subtitle: "Des couvertures qui donnent envie d'aller plus loin",
		images: [
			{ src: "/photos/Couverture - Uneo85 - Juillet.png", alt: "couverture-uneo85-juillet", caption: "Couverture Uneo85 Juillet" },
			{ src: "/photos/Couverture - Uneo85 - Novembre.png", alt: "couverture-uneo85-novembre", caption: "Couverture Uneo85 Novembre" },
			{ src: "/photos/Couverure - Le Grand Huit.png", alt: "couverure-le-grand-huit", caption: "Couverture Le Grand Huit" },
		],
	},
	{
		id: "Les mockups",
		title: "Les mockups",
		subtitle: "Visualisation des créations avant même de les valider",
		images: [
			{ src: "/photos/Mockup - Binome - Bureatique.png", alt: "mockup-binome-bureatique", caption: "Mockup Binome Bureatique" },
			{ src: "/photos/Mockup - Binome - Mobile.png", alt: "mockup-binome-mobile", caption: "Mockup Binome Mobile" },
			{ src: "/photos/Mockup - Binome - Polo Blanc.png", alt: "mockup-binome-polo-blanc", caption: "Mockup Binome Polo Blanc" },
			{ src: "/photos/Mockup - Binome - Polo Teal.png", alt: "mockup-binome-polo-teal", caption: "Mockup Binome Polo Teal" },
			{ src: "/photos/Mockup - Binome - Stand.png", alt: "mockup-binome-stand", caption: "Mockup Binome Stand" },
			{ src: "/photos/Mockup - Binome - Vehicule.png", alt: "mockup-binome-vehicule", caption: "Mockup Binome Véhicule" },
			{ src: "/photos/Mockup - Taff&co - Mobile.png", alt: "mockup-taffco-mobile", caption: "Mockup Taff&co Mobile" },
			{ src: "/photos/Mockup - Uneo85 - Badge.png", alt: "mockup-uneo85-badge", caption: "Mockup Uneo85 Badge" },
			{ src: "/photos/Mockup - Avo travux - Carte de visite.png", alt: "mockup-avo-travux-carte-de-visite", caption: "Mockup Avo travux Carte de visite" },
		],
	},
	{
		id: "Les réseaux sociaux",
		title: "Les réseaux sociaux",
		subtitle: "Contenus spécifiques aux réseaux sociaux",
		images: [
			{ src: "/photos/Reseau - Avo travaux - Ouverture.png", alt: "reseau-avo-travaux-ouverture", caption: "Réseau Avo travaux Ouverture" },
			{ src: "/photos/Reseau - Binome - Page Fb.png", alt: "reseau-binome-page-fb", caption: "Réseau Binome Page Fb" },
			{ src: "/photos/Reseau - Cartable - Assemble-generale.jpg", alt: "reseau-cartable-assemblee-generale", caption: "Réseau Cartable Assemblée générale" },
			{ src: "/photos/Reseau - Cartable - Joyeuses fetes.png", alt: "reseau-cartable-joyeuses-fetes", caption: "Réseau Cartable Joyeuses fetes" },
			{ src: "/photos/Reseau - Cartable - Publi Noel.jpg", alt: "reseau-cartable-publi-noel", caption: "Réseau Cartable Publi Noel" },
			{ src: "/photos/Reseau - Les petites Mains - Campagne Financement.jpg", alt: "reseau-les-petites-mains-campagne-financement", caption: "Réseau Les petites Mains Campagne Financement" },
			{ src: "/photos/Reseau - Monts Plan - Publi 1.png", alt: "reseau-monts-plan-publi-1", caption: "Réseau Monts Plan Publi 1" },
			{ src: "/photos/Reseau - Monts plan - Publi 2.png", alt: "reseau-monts-plan-publi-2", caption: "Réseau Monts plan Publi 2" },
			{ src: "/photos/Reseau - Monts plan - Publi 3.png", alt: "reseau-monts-plan-publi-3", caption: "Réseau Monts plan Publi 3" },
			{ src: "/photos/Reseau - Sare Photos - Header.png", alt: "reseau-sare-photos-header", caption: "Réseau Sare Photos Header" },
			{ src: "/photos/Reseau - Tealii - Header 1.png", alt: "reseau-tealii-header-1", caption: "Réseau Tealii Header 1" },
			{ src: "/photos/Reseau - Tealii - Header 2.png", alt: "reseau-tealii-header-2", caption: "Réseau Tealii Header 2" },
			{ src: "/photos/Reseau - Teet - Page Fb.jpg", alt: "reseau-teet-page-fb", caption: "Réseau Teet Page Fb" },
		],
	},
	{
		id: "Les autres supports",
		title: "Les autres supports",
		subtitle: "Tout ce qui sort des cases et s'adapte aux besoins",
		images: [
			{ src: "/photos/Panneau de chantier - Mon Plan.jpg", alt: "panneau-de-chantier-mon-plan", caption: "Panneau de chantier Mon Plan" },
			{ src: "/photos/Plaquette - Tealii.png", alt: "plaquette-tealii", caption: "Plaquette Tealii" },
			{ src: "/photos/Plaquette - Monts Plan.png", alt: "plaquette-monts-plan", caption: "Plaquette Monts Plan" },
			{ src: "/photos/Cv - Gouyon Cedric.png", alt: "cv-gouyon-cedric", caption: "Cv Gouyon Cédric" },
		],
	},
];

interface LightboxProps {
	images: RealisationImage[];
	currentIndex: number;
	onClose: () => void;
	onPrev: () => void;
	onNext: () => void;
}

function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
	const img = images[currentIndex];

	return (
		<div
			className="hp-lightbox"
			onClick={onClose}
			onKeyDown={(e) => {
				if (e.key === "Escape") onClose();
			}}
			role="dialog"
			aria-modal="true"
			aria-label="Aperçu image"
		>
			<button type="button" className="hp-lightbox__close" onClick={onClose} aria-label="Fermer">
				✕
			</button>
			<button
				type="button"
				className="hp-lightbox__nav hp-lightbox__nav--prev"
				onClick={(e) => {
					e.stopPropagation();
					onPrev();
				}}
				aria-label="Image précédente"
			>
				&#8592;
			</button>
			<figure className="hp-lightbox__content" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
				<img src={img.src} alt={img.alt} className="hp-lightbox__img" />
				{img.caption && <figcaption className="hp-lightbox__caption">{img.caption}</figcaption>}
				<span className="hp-lightbox__counter">
					{currentIndex + 1} / {images.length}
				</span>
			</figure>
			<button
				type="button"
				className="hp-lightbox__nav hp-lightbox__nav--next"
				onClick={(e) => {
					e.stopPropagation();
					onNext();
				}}
				aria-label="Image suivante"
			>
				&#8594;
			</button>
		</div>
	);
}

function Gallery({ section }: { section: RealisationSection }) {
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

	const openLightbox = (index: number) => setLightboxIndex(index);
	const closeLightbox = () => setLightboxIndex(null);
	const prevImage = () => setLightboxIndex((i) => (i !== null ? (i - 1 + section.images.length) % section.images.length : null));
	const nextImage = () => setLightboxIndex((i) => (i !== null ? (i + 1) % section.images.length : null));

	return (
		<section className="hp-realisation" id={section.id}>
			<div className="hp-realisation__header">
				<div className="hp-realisation__header-noise" aria-hidden="true" />
				<div className="hp-realisation__header-grid" aria-hidden="true" />
				<div className="hp-realisation__header-orbs" aria-hidden="true">
					<div className="hp-realisation__orb hp-realisation__orb--1" />
					<div className="hp-realisation__orb hp-realisation__orb--2" />
				</div>
				<div className="hp-realisation__header-inner">
					<h2 className="hp-realisation__title">{section.title}</h2>
					<p className="hp-realisation__subtitle">{section.subtitle}</p>
				</div>
			</div>

			<div className="hp-gallery">
				{section.images.map((img, idx) => (
					<button
						key={img.alt}
						className="hp-gallery__item"
						onClick={() => openLightbox(idx)}
						type="button"
						aria-label={`Ouvrir ${img.caption ?? img.alt}`}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") openLightbox(idx);
						}}
					>
						<div className="hp-gallery__img-wrap">
							<img
								src={img.src}
								alt={img.alt}
								className="hp-gallery__img"
								loading="lazy"
								onError={(e) => {
									(e.currentTarget as HTMLImageElement).style.display = "none";
									const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
									if (placeholder) placeholder.style.display = "flex";
								}}
							/>
							<div className="hp-gallery__placeholder" style={{ display: "none" }}>
								<span>🖼️</span>
								<span>{img.alt}</span>
							</div>
							<div className="hp-gallery__overlay" aria-hidden="true">
								<span className="hp-gallery__zoom">🔍</span>
							</div>
						</div>
						{img.caption && <figcaption className="hp-gallery__caption">{img.caption}</figcaption>}
					</button>
				))}
			</div>

			{lightboxIndex !== null && <Lightbox images={section.images} currentIndex={lightboxIndex} onClose={closeLightbox} onPrev={prevImage} onNext={nextImage} />}
		</section>
	);
}

function HomePage() {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<main className="hp-home">
			<section className="hp-hero">
				<div className="hp-hero__noise" aria-hidden="true" />
				<div className="hp-hero__grid" aria-hidden="true" style={{ transform: `translateY(${scrollY * 0.5}px)` }} />
				<div className="hp-hero__orbs" aria-hidden="true">
					<div className="hp-hero__orb hp-hero__orb--1" />
					<div className="hp-hero__orb hp-hero__orb--2" />
					<div className="hp-hero__orb hp-hero__orb--3" />
				</div>
				<header className="hp-hero__inner">
					<h1 className="hp-hero__title">
						On a tous besoin de
						<br />
						<span className="hp-hero__title-accent">communiquer</span>
						<br />
						pour valoriser son image
					</h1>
					<p className="hp-hero__sub">
						Passionné de graphisme et autodidacte actif, J'adore donner vie aux idées à travers la conception d’identités visuelles et de supports print et digitaux. Que ce soit pour un logo, une carte de visite, un flyer ou des publications pour les réseaux sociaux, je crée des visuels en fonction des besoins et des
						envies. De la couverture de catalogue aux objets publicitaires, j'aime mettre mon énergie pour booster et faire briller la communication.
					</p>
				</header>
			</section>

			{realisationSections.map((section) => (
				<Gallery key={section.id} section={section} />
			))}

			<section className="hp-cta" id="contact">
				<div className="hp-cta__noise" aria-hidden="true" />
				<div className="hp-cta__glow" aria-hidden="true" />
				<div className="hp-section-inner hp-section-inner--narrow hp-cta__inner">
					<header>
						<h2>Mon travail ne s'arrête pas qu'à une seule solution graphique.</h2>
						<span className="hp-hero__title-accent">
							Découvrez aussi mon second univers :{" "}
							<a href="https://gouyon-cedric.onrender.com/" target="_blank" rel="noopener noreferrer" className="hero-link">
								Le développement web
							</a>
						</span>
					</header>
				</div>
			</section>
		</main>
	);
}

export default HomePage;
