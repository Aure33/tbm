const { nextui } = require("@nextui-org/react");

const colors = {
	light: {
		colors: {
			text: "#0c0b0b",
			background: "#ffffff",
			primary: "#059CE3",
			secondary: "#8FBB1A",
			accent: "#E6007E",
		},
	},
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: colors.light,
		},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				light: colors.light,
			},
		}),
	],
};
