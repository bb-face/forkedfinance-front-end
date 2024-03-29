// import main from "../assets/eth.svg";

function Home() {
	return (
		<>
			<div className="page">
				<div className="info">
					<h2>
						<span>Web3</span>
						Banking
					</h2>
					<div>
						<ul>
							<li>Connect Wallet</li>
							<li>Deposit USDC to Earn APR </li>
							<li>Send USDC without Gas or Fees</li>
							<li>Withdraw USDC</li>
						</ul>
					</div>

					{/* <Link to="/login" className="btn">
            Sign In
          </Link>
          <Link to="/register" className="btn">
            Sign Up
          </Link> */}
				</div>
				{/* <img src={main} alt="job hunt" className="img main-img" /> */}
			</div>
		</>
	);
}

export default Home;
