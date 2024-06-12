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

				<div className="flex text-base text-white items-center  max-w-md mb-8">
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
			<div className="flex text-base text-white items-center  max-w-md mb-8"> 
				<ul className="list-none space-y-2">
					<li className="text-white text-lg flex items-center">
					No Pre-sale, no allocations, 86% of all token in Uniswap Pair. Anyone who wants to be a part of it - can.
					</li>
					
					<li className="text-white text-lg flex items-center">
					LP Burnt
					</li>
					<li className="text-white text-lg flex items-center">
					Ownership Renounced 
					Contract ownership renounced to guarantee complete security and safety of your Tuto tokens.
					</li>
					<li className="text-white text-lg flex items-center">
					Deposit Tuto tokens and recieve a points mulriplier to be eligible for a bigger chunk of community airdrop. After the Airdrop seasons are compelted staked Tuto tokens will earn protocol revenue share.
					</li>
				</ul>
			</div>	
			</div>
				<div> 
					<p>
						Tokenomics
					</p>
				</div>
			<div> How to use it - steps 
				<div className="flex flex-col justify-center items-center">
					<div className="flex flex-row">
						<div className="h-32 w-32">
							<h2  className="text-2xl">
								Deposit USDC
							</h2>
							<p>Testing Testing Testing Testing Testing</p>
						</div>
							<HiArrowSmRight className="mr-2" />
						<div className="h-32 w-32">
							<h2  className="text-2xl">
								Transfer and Pay
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
								Accumulate Points
							</h2>
						</div>
					</div>

					{/* <li className="text-white text-lg flex items-center">
						 Deposit USDC
					</li>
					<div> <HiArrowSmRight className="mr-2" /> </div>
					<li className="text-white text-lg flex items-center">
						 Transfer and Pay
					</li>
					<li className="text-white text-lg flex items-center">
						Accumulate Points
					</li>
					<li className="text-white text-lg flex items-center">
						Withdraw USDC
					</li> */}
				</div>
			</div>
			<div> Roadmap </div>
			<div> Disclaimer - no asscoication with bare bears and intrinsic value or expectation of financial return </div>


			{/* <div  className="flex flex-row w-screen justify-center items-center">
        
				<div className="flex text-base text-white items-center  max-w-md mb-8">
				<ul className="list-none space-y-2">
					<li className="text-white text-lg flex items-center">
					We Challenge the Current Status Quo
					</li>
					<li className="text-white text-lg flex items-center">
					Unfair token distribution. Nonsense airdrop. Poor execution. 
					</li>
					<li className="text-white text-lg flex items-center">
					We see you, crypto world. Tuto is here to call out all the nonsense and do things differently.
					No more privileged insiders, no more rigged games. Just a fair shot at owning the first proto-memecoin 
					</li>
			
				</ul>
				
				
				</div>
			</div> */}
			
			
		</div>
		
	);
}

export default Home;
