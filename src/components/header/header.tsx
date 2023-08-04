import { FLEX } from '../css';
import { NavBar } from './navbar';

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
