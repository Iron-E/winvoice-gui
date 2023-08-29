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
				/** `<body>` tag */
				body: {
					bg: COLORS.gray[200],
				},

				/** `<Dim>` component u*/
				dim: {
					bg: COLORS.black,
				},

				/** `<Form>` component u*/
				form: {
					button: {
						bg: COLORS.white,
						border: COLORS.gray[400],
						'bg-hover': COLORS.sky[300],
						'border-hover': COLORS.sky[200],
					},

					field: {
						bg: COLORS.white,
					},
				},

				/** `<Header>` component u*/
				header: {
					bg: COLORS.green[400],
					border: COLORS.green[700],
					button: {
						bg: COLORS.green[600],
						fg: COLORS.white,
					},
					dropdown: {
						bg: COLORS.green[200],
						'bg-even': '#ccffcc',
						border: COLORS.gray[400],
					},
				},

				/** `<Modal>` component u*/
				modal: {
					bg: COLORS.gray[300],
				},

				/** `<Navbar>` component u*/
				navbar: {
					entry: {
						'bg-current': COLORS.green[300],
					},

					link: {
						'bg-hover-xl': COLORS.green[200],
						bg: COLORS.green[100],
						border: COLORS.gray[400],
					},
				},

				/** `<Message>` component u*/
				message: {
					'bg-error': COLORS.rose[400],
					'bg-info': COLORS.sky[300],
					'bg-warn': COLORS.orange[400],
				},

				/** `<XButton>` component u*/
				x: {
					'bg-hover': COLORS.rose[400],
				},
			},
		},
	},
}
