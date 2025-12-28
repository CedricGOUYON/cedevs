import { useEffect } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { constants } from "../../setup/constants";

function App() {
	useEffect(() => {
		const appName = constants.APP_NAME;

		document.title = appName;

		console.log(`🟢 CLIENT : Titre du projet configuré sur "${appName}"`);
	}, []);

	return (
		<>
			<Outlet />
			<ToastContainer position="bottom-right" aria-label="notification" />
		</>
	);
}

export default App;
