import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { constants } from "../../setup/constants";
import router from "./router";

function App() {
	useEffect(() => {
		document.title = constants.APP_NAME;
	}, []);

	return <RouterProvider router={router} />;
}

export default App;
