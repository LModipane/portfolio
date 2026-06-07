import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',

		// Include this line if you are utilizing the `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {},
	},
	plugins: [typography],
};

export default config;
