import './globals.css';
import { InnerRootLayout } from './layout/inner';
import { Inter } from 'next/font/google';
import { propsWith as w } from '@/components';
import { type Metadata } from 'next';

const INTER = Inter({ subsets: ['latin'] });

/** NOTE: cannot be renamed to project style guidelines for constants. */
export const metadata: Readonly<Metadata> = {
	title: 'Winvoice',
	description: 'A graphical manager for invoices',
};

/** @return the layout used for all pages in the application. */
export default function RootLayout(props: w.Children): React.ReactElement {
	return (
		<html lang='en'>
			<body className={INTER.className}>
				<InnerRootLayout>
					{props.children}
				</InnerRootLayout>
			</body>
		</html>
	);
}
