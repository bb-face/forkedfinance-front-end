import React from "react";
import { FaGithub, FaDiscord, FaTwitter, FaTelegram } from "react-icons/fa";
import etherscanLogo from "../assets/etherscan.png";
import uniswapLogo from "../assets/uniswapLogo.png";
import dexScreenerLogo from "../assets/dexScreenerLogo.png";

function Footer() {
	return (
		<footer className="bg-primary w-full py-4 px-8 fixed bottom-0 z-50 flex items-center justify-center">
			<div className="flex items-center space-x-8">
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
				<img src={etherscanLogo} alt="etherscan" className="w-6 " />
		  		<img src={uniswapLogo} alt="uniswap" className="w-6 bg-white border rounded-full" />
		  		<img src={dexScreenerLogo} alt="dexscreener" className="w-6 "/>
				<p className="text-sm">© 2024 Tuto by ForkedFinance</p>
			</div>
		</footer>
	);
}

export default Footer;
