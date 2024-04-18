import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";
import useNetworkChange from "./customHooks/useNetworkChange";

function App() {
  useNetworkChange();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[header-height] pb-[footer-height] flex items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
