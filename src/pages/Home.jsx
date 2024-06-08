import { CiWallet } from "react-icons/ci";
import { AiOutlineRise } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { RiTakeawayFill } from "react-icons/ri";

import tutoBear from "../assets/TutoBear.png";

function Home() {
	return (
		<div className="flex flex-col h-screen justify-center items-center  text-center px-4">
			<h1 className="text-white text-4xl font-bold text-primary leading-tight mb-4">
				The First and Only Protocol Memecoin
			</h1>

			<div  className="flex flex-row w-screen justify-center items-center">
          		<img src={tutoBear} alt="Tuto Bear" className="tutoBear" />

				<div className="flex text-base text-white items-center  max-w-md mb-8">
				<ul className="list-none space-y-2">
					<li className="text-white text-lg flex items-center">
						<CiWallet className="mr-2" /> Fair Launch

					</li>
					<li className="text-white text-lg flex items-center">
						<RiTakeawayFill className="mr-2" /> Token Utility
					</li>
					<li className="text-white text-lg flex items-center">
						<AiOutlineRise className="mr-2" /> LP Burnt 
					</li>
					<li className="text-white text-lg flex items-center">
						<IoSend className="mr-2" /> Ownership Renounced
					</li>
				</ul>
				
				</div>
			</div>
			
			
		</div>
		
	);
}

export default Home;
