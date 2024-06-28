import {
  IoArrowBackSharp,
  IoArrowDownSharp,
  IoArrowForwardSharp,
  IoArrowUpSharp,
} from "react-icons/io5";
import { RiHandCoinLine, RiContractFill } from "react-icons/ri";
import { BsFire } from "react-icons/bs";
import { BiSolidNoEntry } from "react-icons/bi";
import { MdOutlineTrendingDown } from "react-icons/md";
import { FiCopy } from "react-icons/fi";
import { IoMdStar } from "react-icons/io";


import { useSetRecoilState } from "recoil";
import { messageAtom } from "../state/message";

import tutoBear from "../assets/TutoBear.png";
import roadMapPixel from "../assets/pixelRoadmapv2.png";
import rocket from "../assets/rocket.png";

import { tutoAddr } from "../costant/prod-costant";

import CopyToClipboard from "react-copy-to-clipboard";
import PieChart from "../components/PieChart";

function Home() {

  const setMessage = useSetRecoilState(messageAtom);

  return (


    <div className="flex flex-col justify-center items-center text-center bg-black overflow-x-hidden">
      <h1 className="text-white md:text-2xl text-xl font-bold leading-tight mb-4 mt-4 press-start-2p-regular">
        The First & Only Ethereum Protocol Memecoin
      </h1>
      <div className="flex flex-col w-screen max-w-5xl justify-evenly items-center md:flex-row">
        <img src={tutoBear} alt="Tuto Bear" className="tutoBear scale-x-[-1] h-60 z-1" />
        <div className="flex flex-col text-2xl text-white items-center  max-w-lg">
          <h2 className="text-white text-3xl font-bold leading-tight mb-1 ">
            $TUTO
          </h2>
          <p>No More Greedy Developers</p>
          <p>No More Crazy APYs</p>
          <p className="flex items-center">No More <MdOutlineTrendingDown size={35} className="ml-2" /></p>

          <p className="mt-6 text-2xl font-black">Tuto is Different</p>
          <CopyToClipboard className="flex flex-row md:text-xl text-sm cursor-copy items-center" text={tutoAddr} onCopy={() => { setMessage("Copied to Clipboard!") }} >

            <div className="mt-1"> {tutoAddr} <FiCopy size={22} className="ml-2" />
            </div>
          </CopyToClipboard>
        </div>
      </div>
      <div className="w-screen h-fit py-7 bg-zinc-900 flex flex-col sm:flex-row items-center justify-center ">
        <div className="max-w-5xl py-8 md:mr-60 flex justify-center items-center flex-col text-sm press-start-2p-regular">
          <div className="w-42 text-xs md:text-md">
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
          <div className="flex flex-row">
            <div className="md:h-44 md:w-52 h-32 w-32 border-white border-2 flex flex-col">
              <h2 className="press-start-2p-regular bg-black py-4 md:text-sm text-sm-custom">Deposit USDC</h2>
              <div className="flex flex-col flex-grow items-center justify-center text-left border-t-2 px-4 bg-black md:text-sm text-xs">
                Generates Points <br />
                Access to Transfers
              </div>
            </div>
            <IoArrowForwardSharp size={40} className="place-self-center" />
            <div className="md:h-44 md:w-52 h-32 w-32 border-white border-2 flex flex-col">
              <h2 className=" md:text-sm text-sm-custom press-start-2p-regular bg-black py-4">Transfer</h2>
              <div className="flex flex-col flex-grow items-center justify-center text-left border-t-2 px-4 bg-black  md:text-sm text-xs">
                Generates Points<br />
                Free and Instant
              </div>
            </div>
          </div>
          <div className="flex flex-row ">
            <IoArrowUpSharp size={40} className="place-self-center" />
            <div className="md:w-48 w-32"></div>
            <IoArrowDownSharp size={40} className="place-self-center" />
          </div>
          <div className="flex flex-row">
            <div className="md:h-44 md:w-52 h-32 w-32 border-white border-2 flex flex-col">
              <h2 className="md:text-sm text-sm-custom press-start-2p-regular bg-black py-4">Withdraw USDC</h2>
              <div className="flex flex-col flex-grow items-center justify-center border-t-2 px-4 bg-black  md:text-sm text-xs">
                Generates Points
              </div>
            </div>
            <IoArrowBackSharp size={40} className="place-self-center" />
            <div className="md:h-44 md:w-52 h-32 w-32 border-white border-2 flex flex-col">
              <h2 className="md:text-sm text-sm-custom press-start-2p-regular bg-black py-4">Get Points</h2>
              <div className="flex flex-col flex-grow items-center justify-center border-t-2 px-4 bg-black  md:text-sm text-xs">
                Stake Tuto to Mutliply Points
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-screen bg-black">
        <div className="flex flex-col md:flex-row text-xl text-left text-white max-w-7xl mt-4 mb-8 justify-center items-center">
          <div className="flex flex-col justify-center h-96 w-1/3 min-w-96 relative mr-14 ">
            <img src={rocket} className="absolute h-12 invert" style={{ top: "288px", right: "275px" }} />
            <div className="absolute " style={{ top: "25px", right: "254px" }}>
              <IoMdStar />
            </div>
            <div className="absolute " style={{ top: "11px", right: "218px" }}>
              <IoMdStar />
            </div>
            <div className="absolute " style={{ top: "1px", right: "242px" }}>
              <IoMdStar />
            </div>
            <div className="absolute " style={{ top: "33px", right: "312px" }}>
              <IoMdStar />
            </div>
            <div className="absolute " style={{ top: "14px", right: "296px" }}>
              <IoMdStar />
            </div>
            <div className="flex flex-col items-center">
              <h2 className="absolute press-start-2p-regular items-start  mb-4" style={{ top: "38px", right: "94px" }}> Roadmap</h2>
              <div className="absolute " style={{ top: "75px", right: "190px" }}>
                <img src={roadMapPixel} className=" scale-x-150 h-64 w-80 invert" />
              </div>
              <div className="flex items-start" >
                <div className="absolute press-start-2p-regular text-xs " style={{ top: "103px", right: "18px" }}>
                  <div className="flex flex-col items-start gap-y-12 ">
                    <p className="ml-2"> Community Airdrop </p>
                    <p className="ml-2"> Merchants Section </p>
                    <p className="ml-2"> Lending & Borrowing </p>
                    <p className="ml-2"> MemeFi Dominance </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3 min-w-96">
            <PieChart />
          </div>
          <div className="flex flex-col w-1/3 min-w-96 md:text-right gap-y-2 ml-4">
            <p className="mb-2 text-2xl  underline underline-offset-8 decoration-2	">Token Supply: 84,000,000,000</p>
            <p className="text-xl ">Uniswap Pool: 72,240,000,000</p>
            <p className="text-xl ">Community Airdrop: 7,560,000,000</p>
            <p className="text-xl ">CEX Listing: 4,200,000,000</p>
          </div>
        </div>
      </div>
      <div className="w-screen text-xs py-1 bg-black text-">
        Tuto Bear is inspired by "We Bare Bears". Tuto has no association with
        "We Bare Bears" or Cartoon Network. Pie Chart by highcharts.com
      </div>
    </div>
  );
}

export default Home;
