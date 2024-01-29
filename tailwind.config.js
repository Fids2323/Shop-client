/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				main: "#29065c",
				hero: "#DCE3ED",
				hover: "#73B3E7",
			},
			screens: {
				"sm": "640px",
				"md": "768px",
				"lg": "1024px",
				"xl": "1280px",
				"2xl": "1536px",
			},
			backgroundImage: {
				'bg-section': "url('/src/assets/images/bg_section.jpg')",
			}
		},
	},
	plugins: [],
};
