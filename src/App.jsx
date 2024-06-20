import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";
import useNetworkChange from "./customHooks/useNetworkChange";

function App() {
  useNetworkChange();

  // TODO: it wouldn't take the height from the config, check:
  //<main className="flex-grow pt-[header-height] pb-[footer-height] flex items-center justify-center overflow-auto"></main>

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar className="fixed top-0 left-0 w-full z-10" />
      <main className="flex-grow pt-32 pb-10 flex items-center justify-center overflow-auto">
        <Outlet />
      </main>
      <Footer className="fixed bottom-0 left-0 w-full z-10" />
    </div>
  );
}

export default App;
