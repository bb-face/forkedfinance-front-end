import { Outlet } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
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
