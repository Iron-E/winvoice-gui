import * as hooks from '../hooks';
import React from 'react';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { Click, type Children } from './props-with';
import { FLEX, HIDDEN_XL_FLEX } from './css';
import { NavBar } from './header/navbar';

export const HEADER_CSS = {
	button: 'px-1.5 py-1 mt-1 xl:mt-0 mx-3 xl:ml-0 xl:mr-1 shadow bg-green-600 text-white rounded',
} as const;

function Dropdown(props: Children<Click<{}, 'onClose'>>): React.ReactElement {
	hooks.useKeydownHandler({ Escape: true }, props.onClose);

	return (
		<div className="xl:hidden fixed w-fit min-w-full pb-3 border-b-2 top-[2.6rem] bg-green-200 border-b-gray-400 shadow-lg rounded-b-2xl">
			{props.children}
		</div>
	);
}

/**
 * @param children additional elements shown inside the header.
 * @return the header for the given `current` page.
 */
export function Header(props: Children): React.ReactElement {
	const [DROPDOWN_VISIBLE, setDropdownVisible] = React.useState(false);

	return (
		<header className={`${FLEX} justify-between w-fit min-w-full py-1 sticky top-0 bg-green-400 border-b-2 border-b-green-700`}>
			<h1 className='ml-2 font-bold text-2xl'>Winvoice</h1>

			{/* Wide screen */}
			<NavBar className={`${HIDDEN_XL_FLEX} justify-center`} />
			<div className={HIDDEN_XL_FLEX}>
				{props.children}
			</div>

			{/* Small screen */}
			<button className='xl:hidden w-5 my-1 mr-3' onClick={() => setDropdownVisible(!DROPDOWN_VISIBLE)}>
				<Bars3Icon className={`duration-200 ${DROPDOWN_VISIBLE ? 'rotate-90' : undefined}`} />
			</button>

			{DROPDOWN_VISIBLE && <Dropdown onClose={() => setDropdownVisible(false)}>
				<div className='flex flex-col'>
					<NavBar className={`[display:inherit] [flex-flow:inherit]`} />
					<div className={`[display:inherit] flex-col-reverse`}>
						{props.children}
					</div>
				</div>
			</Dropdown>}
		</header>
	);
}
