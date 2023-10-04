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
				'gradient-radial': 'radial-gradient(circle farthest-side at 50% 50%, var(--tw-gradient-stops))',
			},

			colors: {
				/** `<body>` tag */
				body: {
					bg: COLORS.gray[200],
					fg: COLORS.black,
				},

				'bordered-label': {
					border: COLORS.gray[500],
					bg: COLORS.stone[200],
					nested: {
						bg: COLORS.slate[300],
					}
				},

				/** `<Dim>` component */
				dim: {
					bg: COLORS.black,
				},

				/** `<Form>` component */
				form: {
					button: {
						bg: COLORS.white,
						'bg-hover': COLORS.sky[300],
						border: COLORS.gray[400],
						'border-hover': COLORS.sky[200],
					},

					field: {
						bg: COLORS.white,
						'bg-readonly': COLORS.slate[400],
					},

					label: {
						'fg-invalid': COLORS.red[400],
						'fg-required': COLORS.red[500],
					},
				},

				/** `<Header>` component */
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

				/** `<Modal>` component */
				modal: {
					bg: COLORS.gray[300],
				},

				/** `<Navbar>` component */
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

				/** `<Message>` component */
				message: {
					'bg-error': COLORS.rose[400],
					'bg-info': COLORS.sky[300],
					'bg-warn': COLORS.orange[400],
				},

				/** `<Table>` component */
				table: {
					border: COLORS.black,
					button: {
						bg: COLORS.white,
						'bg-hover': COLORS.sky[300],
					},
					col: {
						border: COLORS.black,
					},
					header: {
						bg: COLORS.green[100],
						button: {
							'fg': COLORS.gray[400],
							'fg-active': COLORS.black,

						},
					},
					row: {
						border: COLORS.black,
						'bg-odd': COLORS.gray[200],
						'bg-even': COLORS.gray[300],
						'bg-selected': COLORS.sky[300],
					},
				},

				/** `<XButton>` component */
				x: {
					'bg-hover': COLORS.rose[400],
				},
			},
			content: {
				/** an empty string*/
				empty: '',
			},
		},
	},
}
