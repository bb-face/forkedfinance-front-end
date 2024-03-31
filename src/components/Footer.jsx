import React from "react";
// import styled from "styled-components";

import { TwitterOutlined, GithubOutlined } from "@ant-design/icons";

function Footer() {
	return (
		<footer className="bg-primary text-white w-full py-4 px-8 fixed bottom-0 z-50">
			<a
				href={"https://twitter.com/ForkedFinance_"}
				target="_blank"
				rel="noreferrer"
				className="social"
			>
				<TwitterOutlined style={{ fontSize: "30px", color: "#0055cb" }} />
			</a>

			<a
				href={"https://github.com/yury-ff"}
				target="_blank"
				className="social"
				rel="noreferrer"
			>
				<GithubOutlined style={{ fontSize: "30px", color: "#0055cb" }} />
			</a>
		</footer>
	);
}

export default Footer;
