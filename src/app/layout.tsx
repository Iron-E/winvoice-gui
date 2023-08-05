import './globals.css'
import { type Metadata } from 'next'
import { Inter } from 'next/font/google'

import { api } from '../components'

const INTER = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Winvoice',
	description: 'A graphical manager for invoices',
}

export default function RootLayout(props: React.PropsWithChildren<{}>): React.ReactElement {
	return (
		<html lang="en">
			<body className={INTER.className}>
				<api.Page>
					{props.children}
				</api.Page>
			</body>
		</html>
	);
}
