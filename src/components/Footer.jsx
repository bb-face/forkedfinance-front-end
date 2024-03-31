import React from "react";
import { FaGithub, FaDiscord } from "react-icons/fa";

function Footer() {
	return (
		<footer className="bg-primary w-full py-4 px-8 fixed bottom-0 z-50 flex items-center justify-center">
			<div className="flex items-center space-x-8">
				<a
					href="https://twitter.com/ForkedFinance_"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaDiscord size={24} />
				</a>
				<a
					href="https://github.com/yury-ff"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaGithub size={24} />
				</a>
				<p className="text-sm">© 2024 Forked Finance</p>
			</div>
		</footer>
	);
}

export default Footer;
