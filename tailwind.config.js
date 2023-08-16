const COLORS = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	plugins: [],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
			},

			colors: {
				dim: {
					bg: COLORS.black,
				},

				header: {
					bg: COLORS.green[400],
					border: COLORS.green[700],
					button: {
						bg: COLORS.green[600],
						fg: COLORS.white,
					},
					dropdown: {
						bg: COLORS.green[200],
						border: COLORS.gray[400],
					},
				},

				modal: {
					bg: COLORS.gray[300],
					button: {
						bg: COLORS.white
					},
				},

				navbar: {
					link: {
						'bg-current': COLORS.green[300],
					},
				},

				message: {
					'bg-error': COLORS.rose[400],
					'bg-info': COLORS.sky[300],
					'bg-warn': COLORS.orange[400],
				},

				x: {
					'bg-hover': COLORS.rose[400],
				},
			},
		},
	},
}
