function Home() {
	return (
		<div class="flex flex-col h-screen justify-center items-center bg-black text-center px-4">
			<h1 class="text-5xl font-bold text-primary leading-tight mb-4">
				The first web3 Meme Banking Protocol
			</h1>
			<p class="text-base text-white max-w-md mb-8">
				<ul>
					<li>Connect Wallet</li>
					<li>Deposit USDC to Earn APR </li>
					<li>Send USDC without Gas or Fees</li>
					<li>Withdraw USDC</li>
				</ul>
			</p>
			<button
				type="button"
				class="text-primary border-2 border-green-500 py-2 px-6 rounded hover:bg-green-500 hover:text-black transition-colors"
			>
				JOIN THE NETWORK
			</button>
		</div>
	);
}

export default Home;
