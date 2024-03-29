import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { Home, Transfer, Deposit, Withdraw, Dashboard } from "./pages";

function App() {
	// const { isLoading } = useGlobalContext();

	// if (isLoading) {
	// 	return (
	// 		<section className="page page-center">
	// 			<div className="loading">Loading ...</div>
	// 		</section>
	// 	);
	// }

	return (
		<>
			<Navbar />
			<Home />
			<Footer />
		</>
	);
}

export default App;
