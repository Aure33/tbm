const { nextui } = require("@nextui-org/react");

const colors = {
	light: {
		colors: {
			text: "#0c0b0b",
			background: "#ffffff",
			primary: "#e6007e",
			secondary: "#059ce3",
			accent: "#8fbb1a",
		},
	},
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
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
