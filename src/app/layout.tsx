import './globals.css';
import { type Children } from '../components/props-with';
import { Inter } from 'next/font/google';
import { Page } from '../components';
import { type Metadata } from 'next';

const INTER = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Winvoice',
	description: 'A graphical manager for invoices',
};

export default function RootLayout(props: Children): React.ReactElement {
	return (
		<html lang='en'>
			<body className={INTER.className}>
				<Page>
					{props.children}
				</Page>
			</body>
		</html>
	);
}
