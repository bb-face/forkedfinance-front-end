/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			spacing: {
				header: "128px",
				footer: "64.25px",
			},
			colors: {
				primary: "#7209b7", // Example primary color
				secondary: "#38a3a5", // Example secondary color
				accent: "#18a0fb", // Example accent color
				dark: "#212121", // Example dark color
			},
		},
	},
	plugins: [],
};
