import React from "react";
import { FaGithub, FaDiscord, FaTwitter, FaTelegram } from "react-icons/fa";
import etherscanLogo from "../assets/etherscan.png";
import uniswapLogo from "../assets/uniswapLogo.png";
import dexScreenerLogo from "../assets/dexScreenerLogo.png";

function Footer() {
  return (
    <footer className="bg-primary py-4 w-full md:fixed bottom-0 z-50 flex items-center justify-evenly sm:justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center space-x-8 justify-center">
          <a
            href="https://twitter.com/Tuto_Protocol"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://t.me/+eJFVxOHHzuY1YmI8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram size={24} />
          </a>
          <a
            href="https://github.com/yury-ff"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} />
          </a>
        </div>
        <div className="flex items-center space-x-8 justify-center md:ml-3">
          <a
            href="https://etherscan.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={etherscanLogo} alt="etherscan" className="w-6 " />
          </a>
          <a
            href="https://app.uniswap.org/swap?chain=sepolia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={uniswapLogo}
              alt="uniswap"
              className="w-6 bg-white border rounded-full"
            />
          </a>
          <a
            href="https://dexscreener.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={dexScreenerLogo} alt="dexscreener" className="w-6 " />
          </a>
        </div>
      </div>
      <p className="text-sm md:ml-6">© 2024 Tuto by ForkedFinance</p>
    </footer>
  );
}

export default Footer;
