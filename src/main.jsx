import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";

import App from "./App.jsx";
import "./index.css";
import Transfer from "./pages/Transfer.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Merchants from "./pages/Merchants.jsx";
import Airdrop from "./pages/Airdrop.jsx";

import Popup from "./components/Popup.jsx";

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
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "airdrop",
        element: <Airdrop />,
      },
      {
        path: "transfer",
        element: <Transfer />,
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
      <Popup />
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
