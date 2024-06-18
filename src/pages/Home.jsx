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




import tutoBear from "../assets/TutoBear.png";

function Home() {
  return (
    <div className="flex flex-col justify-center items-center  text-center">
      <h1 className="text-white text-4xl font-bold leading-tight mb-4 mt-4">
        The First and Only Ethereum Protocol Memecoin
      </h1>

      <div className="flex flex-row w-screen max-w-5xl justify-evenly items-center">
        <img src={tutoBear} alt="Tuto Bear" className="tutoBear scale-x-[-1]" />
        <div className="flex flex-col text-lg text-white items-center  max-w-lg mb-8">
          <h2 className="text-white text-3xl font-bold leading-tight mb-4 mt-4">
            $TUTO
          </h2>
          Tuto is Both a Memecoin and a Protocol Utility Token 
		  <p> 
		  Tuto is above greedy teams and investors
		  </p>
		  <p>
		  No Crazy APYs and No Dumps
		  </p>
		  {/* <p>
		  Tuto is different.
		  </p> */}
        </div>
      </div>

      <div className="w-screen bg-neutral-900 flex flex-col items-center justify-center">
        <div className="max-w-5xl py-8 flex justify-center items-center flex-col">
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
      </div>
      <div className="text-lg text-white  max-w-lg mt-4 mb-8">
        Token Supply: 84,000,000,000 Tokenomics: Uniswap Pool: 86% -
        72,240,000,000 Community airdrop: 9% - 7,560,000,000 CEX listing: 5% -
        4,200,000,000
      </div>
      <div>
        <div className="flex flex-col justify-center items-center">
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
      <div className="w-screen bg-neutral-900 flex flex-col items-center justify-center mt-4">
        <div className="max-w-5xl py-8">
          <h2 className="text-2xl mb-2">MemeFi Dominance Roadmap</h2>
          <div className="flex flex-row items-center">
            <div className="bg-black w-6 h-6 flex justify-center items-center">
              <RiNumber1 />
            </div>
            <p className="ml-2"> Community Airdrop </p>
          </div>
          <div className="flex flex-row items-center">
            <div className="bg-black w-6 h-6 flex justify-center items-center">
              <RiNumber2 />
            </div>
            <p className="ml-2"> Merchants Section </p>
          </div>
          <div className="flex flex-row items-center">
            <div className="bg-black w-6 h-6 flex justify-center items-center">
              <RiNumber3 />
            </div>
            <p className="ml-2"> Lending and Borrowing </p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        Tuto Bear is inspired by "We Bare Bears". Tuto has no asscoication with
        "We Bare Bears" or Cartoon Network.
      </div>
    </div>
  );
}

export default Home;
