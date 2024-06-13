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

			<div  className="flex flex-row w-screen max-w-5xl justify-evenly items-center">
          		<img src={tutoBear} alt="Tuto Bear" className="tutoBear scale-x-[-1]"/>
				<div className="flex text-base text-lg text-white items-center  max-w-lg mb-8">
				Tuto is  both a memecoin and a protocol utility token. Tuto is above greedy developers and investors, crazy APYs and continuous token price drops. Tuto is different.			
				</div>
			</div>

			<div>
			<div className="flex text-base text-white items-center  max-w-2xl mb-8"> 
				<ul className="list-none space-y-2">
					<li className="text-white text-lg flex items-center">
						No Pre-sale, no allocations, 86% of supply in Uniswap Pair. Anyone who wants to be a part of it - can.
					</li>
					<li className="text-white text-lg flex items-center">
						Liquidity Pair (LP) tokens burnt - no chance for a rug pull
					</li>
					<li className="text-white text-lg flex items-center">
						Contract ownership renounced to make Tuto trustless and transparent
					</li>
					<li className="text-white text-lg flex items-center">
						Stake Tuto tokens to multiply your points. After the airdrop Tuto tokens will earn protocol revenue.
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
						<div className="h-50 w-45">
							<h2  className="text-2xl">
								Deposit USDC
							</h2>
							<p>Deposits generate points. Deposited USDC allows users to make p2p transfers.</p>
						</div>
							<HiArrowSmRight className="place-self-center" />
						<div className="h-50 w-45">
							<h2  className="text-2xl">
								Transfer
							</h2>
							<p>Trasnfers generate points. Trasnfers are gas-free and instant.</p>
					
						</div>
					</div>
					<div className="flex flex-row">
						<HiArrowSmDown className="place-self-center" />
						<HiArrowSmUp className="place-self-center" />
					</div>
					<div className="flex flex-row">
						<div className="h-50 w-45">
							<h2  className="text-2xl">
								Withdraw USDC
							</h2>
							<p>Withdrawals generate points. </p>
						</div>
						<HiArrowSmLeft className="place-self-center" />
						<div className="h-50 w-45">
							<h2  className="text-2xl">
								Get Points
							</h2>
							<p>Staked Tuto increases points mutliplier. </p>
						</div>
					</div>
				</div>
			</div>
			<div> Roadmap: meme to defi dominance; Community Airdrop; Merchants; Lending and Borrowing;  </div>
			<div> Tuto Bear is inspired by Ice Bear from "We Bare Bears". Tuto has no asscoication with "We Bare Bears" or Cartoon Network.  </div>	
			
		</div>
		
	);
}

export default Home;
