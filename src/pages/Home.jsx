import { CiWallet } from "react-icons/ci";
import { AiOutlineRise } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { RiTakeawayFill } from "react-icons/ri";

function Home() {
	return (
		<div className="flex flex-col h-screen justify-center items-center  text-center px-4">
			<h1 className="text-5xl font-bold text-primary leading-tight mb-4">
				The first web3 Meme Banking Protocol
			</h1>
			<div className="text-base text-white max-w-md mb-8">
				<ul className="list-none space-y-2">
					<li className="text-white text-lg flex items-center">
						<CiWallet className="mr-2" /> Connect Wallet
					</li>
					<li className="text-white text-lg flex items-center">
						<AiOutlineRise className="mr-2" /> Deposit USDC to Earn APR
					</li>
					<li className="text-white text-lg flex items-center">
						<IoSend className="mr-2" /> Send USDC without Gas or Fees
					</li>
					<li className="text-white text-lg flex items-center">
						<RiTakeawayFill className="mr-2" /> Withdraw USDC
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Home;
