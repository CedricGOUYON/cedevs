// Importez simplement `constants` où vous en avez besoin pour garantir une cohérence et faciliter la maintenance.
// import { constants } from "../../../../setup/constants"

export const constants = {
	ROOT_FOLDER_NAME: "cedevs",
	APP_NAME: "cedevs",

	DEFAULT_USER_NAME: "utilisateur",
	DEFAULT_AVATAR: "/images/avatar_profil.png",

	ROUTE_HOME: "/",
	ROUTE_LOGIN: "/login",
	ROUTE_AUTH: "/auth",
	ROUTE_DASHBOARD: "/dashboard",
	ROUTE_CONTACT: "/contact",

	TEXT_WELCOME: "Bienvenue",
	TEXT_LOGOUT: "Se déconnecter",
	TEXT_LOGIN: "Se connecter",
	TEXT_SEARCH_PLACEHOLDER: "Rechercher...",

	DEFAULT_LANGUAGE: "fr",
	DEFAULT_THEME: "light",
	DEFAULT_TIMEOUT: 10000,
	DEFAULT_PAGE_SIZE: 10,

	API_BASE_URL: "http://localhost:3310/api",
	API_AUTH_ENDPOINT: "/auth",
};
