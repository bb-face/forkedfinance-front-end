import {
  IoArrowBackSharp,
  IoArrowDownSharp,
  IoArrowForwardSharp,
  IoArrowUpSharp,
} from "react-icons/io5";
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";
import { RiHandCoinLine, RiContractFill } from "react-icons/ri";
import { BsFire } from "react-icons/bs";
import { BiSolidNoEntry } from "react-icons/bi";
import { GiFinishLine } from "react-icons/gi";
import { IoMdRocket } from "react-icons/io";
import { MdOutlineTrendingDown } from "react-icons/md";
import { FiCopy } from "react-icons/fi";

import Roadmap from "../components/Roadmap";


import {useSetRecoilState} from "recoil";
import {messageAtom} from "../state/message";

import tutoBear from "../assets/TutoBear.png";
import roadmap from "../assets/roadmap.svg"


import { tutoAddr } from "../costant/prod-costant";

import CopyToClipboard from "react-copy-to-clipboard";
import PieChart from "../components/PieChart";

function Home() {

const setMessage = useSetRecoilState(messageAtom);

  return (
    <div className="flex flex-col justify-center items-center text-center">

      <h1 className="text-white text-4xl font-bold leading-tight mb-4 mt-4">
        The First and Only Ethereum Protocol Memecoin
      </h1>

      <div className="flex flex-row w-screen max-w-5xl justify-evenly items-center">
        <img src={tutoBear} alt="Tuto Bear" className="tutoBear scale-x-[-1]" />
        <div className="flex flex-col text-2xl text-white items-center  max-w-lg">
          <h2 className="text-white text-3xl font-bold leading-tight mb-1 ">
    		$TUTO
          </h2>
		  <p>No More Greedy Developers.</p>
		  <p>No More Crazy APYs.</p>
		  <p className="flex items-center">No More <MdOutlineTrendingDown size={35} className="ml-2" /></p>

		  <p className="mt-6 text-2xl font-black">Tuto is Different.</p>
		  <CopyToClipboard  className="flex flex-row text-xl cursor-copy items-center" text={tutoAddr} onCopy={()=>{setMessage("Copied to Clipboard!")}} > 

		  <div className="mt-1"> {tutoAddr} <FiCopy size={22} className="ml-2" /></div>
		  
		  </CopyToClipboard>


        </div>
      </div>

      <div className="w-screen h-fit py-7 bg-neutral-900 flex flex-row items-center justify-center">
        <div className="max-w-5xl py-8 mr-60 flex justify-center items-center flex-col">
          <div className="w-42">
            <div className="flex flex-row justfy-center items-center">
              <div className="w-10 h-10 border-2 border-white flex justify-center items-center">
                <RiHandCoinLine size={20} />
              </div>
              <div className="ml-10">No Pre-Sale</div>
            </div>
            <div className="h-10 w-0.5 bg-white ml-5"></div>
            <div className="flex flex-row justfy-center items-center">
              <div className="w-10 h-10 border-2 border-white flex justify-center items-center">
                <BiSolidNoEntry size={20} />
              </div>
              <div className="ml-10">No Allocations</div>
            </div>
            <div className="h-10 w-0.5 bg-white ml-5"></div>
            <div className="flex flex-row justfy-center items-center">
              <div className="w-10 h-10 border-2 border-white flex justify-center items-center">
                <BsFire size={20} />
              </div>
              <div className="ml-10">Liquidity pair (LP) Tokens Burnt</div>
            </div>
            <div className="h-10 w-0.5 bg-white ml-5"></div>
            <div className="flex flex-row justfy-center items-center">
              <div className="w-10 h-10 border-2 border-white flex justify-center items-center">
                <RiContractFill size={20} />
              </div>
              <div className="ml-10">Contract Ownership Renounced</div>
            </div>
          </div>
        </div>
		<div className="flex flex-col justify-center items-center">
		{/* <h1 className="text-3xl mb-3"> How to Use </h1> */}
          <div className="flex flex-row">
            <div className="h-44 w-48 border-white border-2 flex flex-col">
              <h2 className="text-2xl bg-black py-4">Deposit USDC</h2>
              <div className="flex flex-col flex-grow items-center justify-center text-left px-4 bg-zinc-900">
                <p> Generates Points</p>
                <p> Access to Transfers</p>
              </div>
            </div>
            <IoArrowForwardSharp size={40} className="place-self-center" />

            <div className="h-44 w-48 border-white border-2 flex flex-col">
              <h2 className="text-2xl bg-black py-4">Transfer</h2>
              <div className="flex flex-col flex-grow items-center justify-center text-left px-4 bg-zinc-900">
                <p> Generates Points</p>
                <p> Free and Instant</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row ">
            <IoArrowUpSharp size={40} className="place-self-center" />
            <div className="w-48"></div>
            <IoArrowDownSharp size={40} className="place-self-center" />
          </div>
          <div className="flex flex-row">
            <div className="h-44 w-48 border-white border-2 flex flex-col">
              <h2 className="text-2xl bg-black py-4">Withdraw USDC</h2>
              <div className="flex flex-col flex-grow items-center justify-center px-4 bg-zinc-900">
                <p> Generates Points</p>
              </div>
            </div>
            <IoArrowBackSharp size={40} className="place-self-center" />
            <div className="h-44 w-48 border-white border-2 flex flex-col">
              <h2 className="text-2xl bg-black py-4">Get Points</h2>
              <div className="flex flex-col flex-grow items-center justify-center px-4 bg-zinc-900">
                <p> Stake Tuto to Mutliply Points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
	  <div className="flex flex-col justify-center items-center"> 
	
      	<div className="flex flex-row text-2xl text-left text-white max-w-6xl mt-4 mb-8 justify-center items-center">

			<div className="flex flex-col items-end justify-evenly h-96 w-1/3 min-w-96 py-8 relative ">
      <img src={roadmap} className="absolute scale-75 rotate-12 invert" style={{top: "40px", right:"140px"}}/> 
              {/* <div className="absolute" style={{top: "-140px", right:"150px"}}> */}

              <div className="flex flex-col items-start w-72"> 
          		<h2 className="text-3xl items-center mb-2"> Roadmap</h2>

              </div>
              {/* </div> */}
                {/* <div className="absolute" style={{top: "-93px", right:"120px"}}> */}
          			<div className="flex flex-row items-start w-60">
            			{/* <div className="bg-black w-6 h-8 flex justify-center items-center">
              			<RiNumber1 />
            			</div> */}
           			<p className="ml-2"> Community Airdrop </p>
         			  </div>
                {/* </div> */}
              {/* <div className="absolute" style={{top: "-12px", right:"120px"}}> */}

          		<div className="flex flex-row items-start w-60">
            	{/* <div className="bg-black w-6 h-8  flex justify-center items-center">
              		<RiNumber2 />
            	</div> */}
            		<p className="ml-2"> Merchants Section </p>
          		</div>
              {/* </div> */}
              {/* <div className="absolute" style={{top: "68px", right:"140px"}}> */}
          		<div className="flex flex-row items-start w-60">
           			{/* <div className="bg-black w-6 h-8 flex justify-center items-center">
             	 		<RiNumber3 />
            		</div> */}
           			<p className="ml-2"> Lending & Borrowing </p>
          		</div>

              {/* </div> */}
              {/* <div className="absolute" style={{top: "180px", right:"100px"}}> */}
				      <div className="flex flex-row items-center">
           			<div className="bg-black w-6 h-8  flex justify-center items-center">
             	 		<IoMdRocket />
            		</div>
           			<p className="ml-2"> MemeFi Dominance </p>
          		</div>

              {/* </div> */}
        	</div>
			<div className="w-1/3 min-w-96"> 
        		<PieChart />
			</div>
			<div className="flex flex-col w-1/3 min-w-96 text-lg text-right"> 
				<p className="mb-4 text-2xl  underline underline-offset-8 decoration-2	">Token Supply: 84,000,000,000</p>
				<p className="mb-2 text-xl ">Uniswap Pool: 72,240,000,000</p>
				<p className="mb-2 text-xl ">Community airdrop: 7,560,000,000</p>
				<p className="text-xl ">CEX listing: 4,200,000,000</p>
			</div>
		
      	</div>
	  </div>
      

      <div className="w-screen text-xs py-1 bg-neutral-900 text-">
        Tuto Bear is inspired by "We Bare Bears". Tuto has no asscoication with
        "We Bare Bears" or Cartoon Network. Pie Chart by highcharts.com
      </div>
    </div>
  );
}

export default Home;
