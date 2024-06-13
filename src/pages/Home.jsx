import { CiWallet } from "react-icons/ci";
import { AiOutlineRise } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { RiTakeawayFill } from "react-icons/ri";
import { HiArrowSmUp} from "react-icons/hi";
import { HiArrowSmDown } from "react-icons/hi";
import { HiArrowSmRight } from "react-icons/hi";
import { HiArrowSmLeft } from "react-icons/hi";


import tutoBear from "../assets/TutoBear.png";

function Home() {
	return (
		<div className="flex flex-col justify-center items-center  text-center px-4">
			<h1 className="text-white text-4xl font-bold text-primary leading-tight mb-4">
				The First and Only Ethereum Protocol Memecoin
			</h1>

			<div  className="flex flex-row w-screen justify-evenly items-center">
          		<img src={tutoBear} alt="Tuto Bear" className="tutoBear scale-x-[-1]"/>

				<div className="flex text-base text-lg text-white items-center  max-w-lg mb-8">
				Tuto is  both a memecoin and a protocol utility token. Tuto is above greedy developers and investors, crazy APYs and continuous token price drops. Tuto is different.			
				{/* <ul className="list-none space-y-2">
					<li className="text-white text-lg flex items-center">
						<CiWallet className="mr-2" /> Etherscan
					</li>
					<li className="text-white text-lg flex items-center">
						<RiTakeawayFill className="mr-2" /> Uniswap
					</li>
					<li className="text-white text-lg flex items-center">
						<AiOutlineRise className="mr-2" /> Dexscreener
					</li>
					<li className="text-white text-lg flex items-center">
						<IoSend className="mr-2" /> Contract address
					</li>
				</ul> */}
				
				
				</div>
			</div>

			<div>
			<div className="flex text-base text-white items-center  max-w-lg mb-8"> 
				<ul className="list-none space-y-2">
					<li className="text-white text-lg flex items-center">
						No Pre-sale, no allocations, 86% of supply in Uniswap Pair. Anyone who wants to be a part of it - can.
					</li>
					<li className="text-white text-lg flex items-center">
						Liquidity Pair token burnt - no rug pulls
					</li>
					<li className="text-white text-lg flex items-center">
						Contract ownership renounced to guarantee complete security and value of your Tuto tokens.
					</li>
					<li className="text-white text-lg flex items-center">
						Deposit Tuto tokens and multiply points for a bigger chunk of community airdrop. After the Airdrop seasons are compelted staked Tuto tokens will earn protocol revenue share.
					</li>
				</ul>
			</div>	
			</div>
				<div className="text-base text-lg text-white  max-w-lg"> 
				 	Token Supply: 84,000,000,000
				 	Tokenomics:
					Uniswap Pool: 86% - 72,240,000,000
					Community airdrop: 9% - 7,560,000,000
					CEX listing: 5% - 4,200,000,000
				</div>
			<div> 
				<div className="flex flex-col justify-center items-center">
					<div className="flex flex-row">
						<div className="h-32 w-32">
							<h2  className="text-2xl">
								Deposit USDC
							</h2>
							<p>Testing Testing Testing Testing Testing</p>
						</div>
							<HiArrowSmRight className="mr-2 justify-center items-center" />
						<div className="h-32 w-32">
							<h2  className="text-2xl">
								Transfer
							</h2>
					
						</div>
					</div>
					<div className="flex flex-row">
						<HiArrowSmDown className="mr-2" />
						<HiArrowSmUp className="mr-2" />
					</div>
					<div className="flex flex-row">
						<div className="h-32 w-32">
							<h2  className="text-2xl">
								Withdraw USDC
							</h2>
						</div>
						<HiArrowSmLeft className="mr-2" />
						<div className="h-32 w-32">
							<h2  className="text-2xl">
								Get Points
							</h2>
						</div>
					</div>
				</div>
			</div>
			<div> Roadmap </div>
			<div> Disclaimer - no asscoication with Bare Bears and intrinsic value or expectation of financial return </div>	
			
		</div>
		
	);
}

export default Home;
