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
			{ src: "/photos/logo-monts-plan.jpg", alt: "logo-monts-plan", caption: "Logo Monts Plan" },
			{ src: "/photos/logo-cote-and-villa.png", alt: "logo-cote-villa", caption: "Logo Cote & Villa" },
			{ src: "/photos/logo-atelier-taka.png", alt: "logo-atelier-taka", caption: "Logo Atelier Taka" },
			{ src: "/photos/logo-les-petites-mains.png", alt: "logo-les-petites-mains", caption: "Logo les petites Mains" },
			{ src: "/photos/logo-sare-photos.png", alt: "logo-sare-photos", caption: "Logo Sare Photos" },
			{ src: "/photos/logo-teet-brigitte.png", alt: "logo-teet-brigitte", caption: "Logo Teet Brigitte" },
			{ src: "/photos/logo-uneo85.png", alt: "logo-uneo85", caption: "Logo Uneo85" },
			{ src: "/photos/logo-pack-and-go.png", alt: "logo-pack-and-go", caption: "Logo Pack And Go" },
			{ src: "/photos/logo-streamflix.png", alt: "logo-streamflix", caption: "Logo StreamFlix" },
			{ src: "/photos/logo-tealii.png", alt: "logo-tealii", caption: "Logo Tealii" },
			{ src: "/photos/logo-seanz.png", alt: "logo-seanz", caption: "Logo SeanZ" },
		],
	},
	{
		id: "Les cartes de visite",
		title: "Les cartes de visite",
		subtitle: "Première impression inoubliable, à portée de main",
		images: [
			{ src: "/photos/carte-de-visite-cedric-gouyon.jpg", alt: "carte-visite-cedric-gouyon", caption: "Carte de visite Cédric Gouyon" },
			{ src: "/photos/carte-de-visite-cote-and-villa.png", alt: "carte-visite-cote-villa", caption: "Carte de visite Cote & Villa" },
			{ src: "/photos/carte-de-visite-monts-plan-1.jpg", alt: "carte-visite-monts-plan-1", caption: "Carte de visite Monts Plan 1" },
			{ src: "/photos/carte-de-visite-monts-plan-2.jpg", alt: "carte-visite-monts-plan-2", caption: "Carte de visite Monts Plan 2" },
			{ src: "/photos/carte-de-visite-net-toit-mousse.png", alt: "carte-visite-net-toit-mousse", caption: "Carte de visite Net Toit Mousse" },
			{ src: "/photos/carte-de-viste-avo-travaux.png", alt: "carte-viste-avo-travaux", caption: "Carte de visite Avo travaux" },
			{ src: "/photos/carte-de-visite-avo-travaux-ffct.png", alt: "carte-de-visite-avo-travaux-ffct", caption: "Carte de visite Avo travaux FFCT" },
		],
	},
	{
		id: "Les flyers",
		title: "Les flyers",
		subtitle: "Des supports print qui captivent",
		images: [
			{ src: "/photos/flyer-avo-travaux.png", alt: "flyer-avo-travaux", caption: "Flyer Avo travaux" },
			{ src: "/photos/flyer-cartable-collecte-vetements.png", alt: "flyer-cartable-collecte-vetements", caption: "Flyer Cartable Collecte vetements" },
			{ src: "/photos/flyer-cartable-pac-2.png", alt: "flyer-cartable-pac-2", caption: "Flyer Cartable Pac 2" },
			{ src: "/photos/flyer-cartable-pac.png", alt: "flyer-cartable-pac", caption: "Flyer Cartable Pac" },
			{ src: "/photos/flyer-les-petites-mains-basketball.png", alt: "flyer-les-petites-mains-basketball", caption: "Flyer Les Petites Mains Basketball" },
			{ src: "/photos/flyer-les-petites-mains-financement.png", alt: "flyer-les-petites-mains-financement", caption: "Flyer Les Petites Mains Financement" },
			{ src: "/photos/flyer-les-petites-mains-marche-de-noel.png", alt: "flyer-les-petites-mains-marche-de-noel", caption: "Flyer Les Petites Mains Marche de noel" },
			{ src: "/photos/flyer-les-petites-mains-ouverture.png", alt: "flyer-les-petites-mains-ouverture", caption: "Flyer Les Petites Mains Ouverture" },
			{ src: "/photos/flyer-monts--plan.png", alt: "flyer-monts-plan", caption: "Flyer Monts Plan" },
			{ src: "/photos/flyer-net-toit-mousse.png", alt: "flyer-net-toit-mousse", caption: "Flyer Net Toit Mousse" },
			{ src: "/photos/flyer-tafandco-1.png", alt: "flyer-tafco-1", caption: "Flyer Taf&co 1" },
			{ src: "/photos/flyer-tafandco-2.png", alt: "flyer-tafco-2", caption: "Flyer Taf&co 2" },
			{ src: "/photos/flyer-tafandco-3.png", alt: "flyer-tafco-3", caption: "Flyer Taf&co 3" },
			{ src: "/photos/flyer-uneo85-jeune-talents.jpg", alt: "flyer-uneo85-jeune-talents", caption: "Flyer Uneo85 Jeune Talents" },
			{ src: "/photos/flyer-uneo85--job-dating.png", alt: "flyer-uneo85-job-dating", caption: "Flyer Uneo85 Job dating" },
		],
	},
	{
		id: "Les couvertures",
		title: "Les couvertures",
		subtitle: "Des couvertures qui donnent envie d'aller plus loin",
		images: [
			{ src: "/photos/couverture-uneo85-juillet.png", alt: "couverture-uneo85-juillet", caption: "Couverture Uneo85 Juillet" },
			{ src: "/photos/couverture-uneo85-novembre.png", alt: "couverture-uneo85-novembre", caption: "Couverture Uneo85 Novembre" },
			{ src: "/photos/couverure-le-grand-huit.png", alt: "couverure-le-grand-huit", caption: "Couverture Le Grand Huit" },
		],
	},
	{
		id: "Les mockups",
		title: "Les mockups",
		subtitle: "Visualisation des créations avant même de les valider",
		images: [
			{ src: "/photos/mockup-binome-bureatique.png", alt: "mockup-binome-bureatique", caption: "Mockup Binome Bureatique" },
			{ src: "/photos/mockup-binome-mobile.png", alt: "mockup-binome-mobile", caption: "Mockup Binome Mobile" },
			{ src: "/photos/mockup-binome-polo-blanc.png", alt: "mockup-binome-polo-blanc", caption: "Mockup Binome Polo Blanc" },
			{ src: "/photos/mockup-binome-polo-teal.png", alt: "mockup-binome-polo-teal", caption: "Mockup Binome Polo Teal" },
			{ src: "/photos/mockup-binome-stand.png", alt: "mockup-binome-stand", caption: "Mockup Binome Stand" },
			{ src: "/photos/mockup-binome-vehicule.png", alt: "mockup-binome-vehicule", caption: "Mockup Binome Véhicule" },
			{ src: "/photos/mockup-taffandco-mobile.png", alt: "mockup-taffco-mobile", caption: "Mockup Taff&co Mobile" },
			{ src: "/photos/mockup-uneo85-badge.png", alt: "mockup-uneo85-badge", caption: "Mockup Uneo85 Badge" },
			{ src: "/photos/mockup-avo-travux-carte-de-visite.png", alt: "mockup-avo-travux-carte-de-visite", caption: "Mockup Avo travux Carte de visite" },
		],
	},
	{
		id: "Les réseaux sociaux",
		title: "Les réseaux sociaux",
		subtitle: "Contenus spécifiques aux réseaux sociaux",
		images: [
			{ src: "/photos/reseau-avo-travaux-ouverture.png", alt: "reseau-avo-travaux-ouverture", caption: "Réseau Avo travaux Ouverture" },
			{ src: "/photos/reseau-binome-page-fb.png", alt: "reseau-binome-page-fb", caption: "Réseau Binome Page Fb" },
			{ src: "/photos/reseau-cartable-assemble-generale.jpg", alt: "reseau-cartable-assemblee-generale", caption: "Réseau Cartable Assemblée générale" },
			{ src: "/photos/reseau-cartable-joyeuses-fetes.png", alt: "reseau-cartable-joyeuses-fetes", caption: "Réseau Cartable Joyeuses fetes" },
			{ src: "/photos/reseau-cartable-publi-noel.jpg", alt: "reseau-cartable-publi-noel", caption: "Réseau Cartable Publi Noel" },
			{ src: "/photos/reseau-les-petites-mains-campagne-financement.jpg", alt: "reseau-les-petites-mains-campagne-financement", caption: "Réseau Les petites Mains Campagne Financement" },
			{ src: "/photos/reseau-monts-plan-publi-1.png", alt: "reseau-monts-plan-publi-1", caption: "Réseau Monts Plan Publi 1" },
			{ src: "/photos/reseau-monts-plan-publi-2.png", alt: "reseau-monts-plan-publi-2", caption: "Réseau Monts Plan Publi 2" },
			{ src: "/photos/reseau-monts-plan-publi-3.png", alt: "reseau-monts-plan-publi-3", caption: "Réseau Monts Plan Publi 3" },
			{ src: "/photos/reseau-sare-photos-header.png", alt: "reseau-sare-photos-header", caption: "Réseau Sare Photos Header" },
			{ src: "/photos/reseau-tealii-header-1.png", alt: "reseau-tealii-header-1", caption: "Réseau Tealii Header 1" },
			{ src: "/photos/reseau-tealii-header-2.png", alt: "reseau-tealii-header-2", caption: "Réseau Tealii Header 2" },
			{ src: "/photos/reseau-teet-page-fb.jpg", alt: "reseau-teet-page-fb", caption: "Réseau Teet Page Fb" },
		],
	},
	{
		id: "Les autres supports",
		title: "Les autres supports",
		subtitle: "Tout ce qui sort des cases et s'adapte aux besoins",
		images: [
			{ src: "/photos/panneau-de-chantier-mon-plan.jpg", alt: "panneau-de-chantier-mon-plan", caption: "Panneau de chantier Mon Plan" },
			{ src: "/photos/plaquette-tealii.png", alt: "plaquette-tealii", caption: "Plaquette Tealii" },
			{ src: "/photos/plaquette-monts-plan.png", alt: "plaquette-monts-plan", caption: "Plaquette Monts Plan" },
			{ src: "/photos/cv-gouyon-cedric.png", alt: "cv-gouyon-cedric", caption: "Cv Gouyon Cédric" },
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
