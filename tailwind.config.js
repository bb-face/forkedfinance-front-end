/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			spacing: {
				header: "128px",
				footer: "64.25px",
			},
		},
	},
	plugins: [],
};
