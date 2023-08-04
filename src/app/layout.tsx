import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NavBar } from '../components'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Winvoice',
	description: 'A graphical manager for invoices',
}

export default function RootLayout(props: { children: React.ReactNode }): React.ReactNode {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NavBar />
				{props.children}
			</body>
		</html>
	);
}
