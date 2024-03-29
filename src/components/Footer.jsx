import React from "react";
// import styled from "styled-components";

import { TwitterOutlined, GithubOutlined } from "@ant-design/icons";

function Footer() {
	return (
		<div className="nav-footer">
			<a
				href={"https://twitter.com/ForkedFinance_"}
				target="_blank"
				className="social"
			>
				<TwitterOutlined style={{ fontSize: "30px", color: "#0055cb" }} />
			</a>

			<a href={"https://github.com/yury-ff"} target="_blank" className="social">
				<GithubOutlined style={{ fontSize: "30px", color: "#0055cb" }} />
			</a>
		</div>
	);
}

export default Footer;
