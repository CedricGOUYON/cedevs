import { createBrowserRouter } from "react-router";
import HomePage from "../src/pages/homePage/HomePage";
import NotFoundPage from "../src/pages/notFoundPage/NotFoundPage";
import App from "./App";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <NotFoundPage />,
		children: [{ index: true, element: <HomePage /> }],
	},
	{
		path: "*",
		element: <NotFoundPage />,
	},
]);
export default router;
