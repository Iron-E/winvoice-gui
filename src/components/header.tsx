import { FLEX } from './css';
import { NavBar } from './header/navbar';

export const HEADER_CSS = {
	button: 'bg-gray-300 rounded px-1 py-1 mr-1',
} as const;

/** @return the header for the given `current` page. */
export function Header(props: React.PropsWithChildren<{}>): React.ReactElement {
	return (
		<header className={`${FLEX} justify-between py-1 sticky top-0 bg-green-400`}>
			<h1 className='ml-2 font-bold text-2xl'>Winvoice</h1>
			<NavBar />
			{props.children}
		</header>
	);
}
