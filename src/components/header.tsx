import * as hooks from '../hooks';
import React from 'react';
import type { Children, On } from './props-with';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { FLEX_BETWEEN, HIDDEN_XL_FLEX } from './css';
import { NavBar } from './header/navbar';
import { CLICKABLE } from './header/style';

export const HEADER_CSS = {
	button: `${CLICKABLE} xl:mx-0 xl:last:mr-1 \
bg-header-button-bg border-header-dropdown-bg xl:border-header-bg hover:border-header-button-bg text-header-button-fg \
shadow`,
} as const;

function Dropdown(props: Children & Required<On<'close'>>): React.ReactElement {
	hooks.useKeydownHandler({ Escape: true }, props.onClose);

	return (
		<div
			className='xl:hidden \
fixed top-[2.6rem] \
px-1 py-3 border-b-2 w-fit min-w-full \
bg-header-dropdown-bg border-b-header-dropdown-border \
shadow-lg rounded-b-2xl'
		>
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
		<header
			className={`${FLEX_BETWEEN} \
sticky top-0 \
py-1 w-fit min-w-full border-b-2 \
bg-header-bg border-b-header-border`}
		>
			<h1 className='ml-2 font-bold text-2xl'>
				Winvoice
			</h1>

			{/* Wide screen */}
			<NavBar className={`${HIDDEN_XL_FLEX} justify-center`} />
			<div className={`${HIDDEN_XL_FLEX} gap-1.5`}>
				{props.children}
			</div>

			{/* Small screen */}
			<button className='xl:hidden w-5 my-1 mr-3' onClick={() => setDropdownVisible(!DROPDOWN_VISIBLE)}>
				<Bars3Icon className={`duration-150 ${DROPDOWN_VISIBLE ? 'rotate-90' : undefined}`} />
			</button>

			{DROPDOWN_VISIBLE && <Dropdown onClose={() => setDropdownVisible(false)}>
				<div className='flex flex-col'>
					<NavBar className={`[display:inherit] [flex-flow:inherit]`} />
					<div className={`[display:inherit] flex-col-reverse gap-1`}>
						{props.children}
					</div>
				</div>
			</Dropdown>}
		</header>
	);
}
