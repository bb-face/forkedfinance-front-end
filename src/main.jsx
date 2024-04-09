import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./context/context.jsx";
import Transfer from "./pages/Transfer.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Merchants from "./pages/Merchants.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "transfer",
				element: <Transfer />,
			},
			{
				path: "dashboard",
				element: <Dashboard />,
			},
			{
				path: "merchants",
				element: <Merchants />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RecoilRoot>
			<AppProvider>
				<RouterProvider router={router} />
			</AppProvider>
		</RecoilRoot>
	</React.StrictMode>,
);
