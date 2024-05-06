import './globals.css';
import localFont from 'next/font/local';
import type { Metadata } from 'next';
import { InnerRootLayout } from './layout/inner';
import { propsWith as w } from '@/components';

const INTER = localFont({
	src: [
		{ path: '../static/font/inter/normal/100.woff2', weight: '100', style: 'normal' },
		{ path: '../static/font/inter/normal/200.woff2', weight: '200', style: 'normal' },
		{ path: '../static/font/inter/normal/300.woff2', weight: '300', style: 'normal' },
		{ path: '../static/font/inter/normal/400.woff2', weight: '400', style: 'normal' },
		{ path: '../static/font/inter/normal/500.woff2', weight: '500', style: 'normal' },
		{ path: '../static/font/inter/normal/600.woff2', weight: '600', style: 'normal' },
		{ path: '../static/font/inter/normal/700.woff2', weight: '700', style: 'normal' },
		{ path: '../static/font/inter/normal/800.woff2', weight: '800', style: 'normal' },
		{ path: '../static/font/inter/normal/900.woff2', weight: '900', style: 'normal' },
	],
});

/** WARN: *must* be `metadata`, cannot be `METADATA` as per project style guidelines */
export const metadata: Readonly<Metadata> = {
	title: 'Winvoice',
	description: 'A graphical manager for invoices',
};

/** @returns the layout used for all pages in the application. */
export default function RootLayout(props: w.Children): React.ReactElement {
	return (
		<html lang='en'>
			<body className={`${INTER.className} bg-body-bg text-body-fg`}>
				<InnerRootLayout>
					{props.children}
				</InnerRootLayout>
			</body>
		</html>
	);
}
