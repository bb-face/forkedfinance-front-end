import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./context/context.jsx";
import Transfer from "./pages/Transfer.jsx";
import Deposit from "./pages/Deposit.jsx";
import Withdraw from "./pages/Withdraw.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/transfer",
		element: <Transfer />,
	},
	{
		path: "/deposit",
		element: <Deposit />,
	},
	{
		path: "/withdraw",
		element: <Withdraw />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AppProvider>
			<RouterProvider router={router} />
		</AppProvider>
	</React.StrictMode>,
);
