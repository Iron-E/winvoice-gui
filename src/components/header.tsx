import * as hooks from '@/hooks';
import Link from 'next/link';
import React from 'react';
import type { Children, On } from './props-with';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { CLICKABLE } from './header/style';
import { FLEX_BETWEEN, HIDDEN_XL_FLEX } from './css';
import { NavBar } from './header/navbar';

export const HEADER_CSS = {
	button: `${CLICKABLE} xl:mx-0 \
bg-header-button-bg border-header-dropdown-bg xl:border-header-bg hover:border-header-button-bg text-header-button-fg`,
} as const;

function Dropdown(props: Children & Required<On<'close'>>): React.ReactElement {
	hooks.useKeydownHandler({ Escape: true }, props.onClose);

	return (
		<div
			className='xl:hidden \
fixed top-[2.6rem] left-0 \
px-2 pt-1 pb-3 border-b-2 w-fit min-w-full \
bg-header-dropdown-bg border-b-header-dropdown-border \
shadow-lg rounded-b-2xl'
		>
			{props.children}
		</div>
	);
}

/**
 * @param children additional elements shown inside the header.
 * @returns the header for the given `current` page.
 */
export function Header(props: Children): React.ReactElement {
	const [DROPDOWN_VISIBLE, setDropdownVisible] = React.useState(false);

	return (
		<header
			className={`${FLEX_BETWEEN} \
sticky top-0 z-[1] \
p-1.5 w-fit min-w-full border-b-2 \
bg-header-bg border-b-header-border`}
		>
			<h1 className='font-bold text-2xl'>
				<Link href="/">Winvoice</Link>
			</h1>

			{/* Wide screen */}
			<NavBar className={`${HIDDEN_XL_FLEX} justify-center`} />
			<div className={`${HIDDEN_XL_FLEX} gap-1.5`}>
				{props.children}
			</div>

			{/* Small screen */}
			<button className='xl:hidden w-5 my-1' onClick={() => setDropdownVisible(!DROPDOWN_VISIBLE)}>
				<Bars3Icon className={`duration-150 ${DROPDOWN_VISIBLE ? 'rotate-90' : undefined}`} />
			</button>

			{DROPDOWN_VISIBLE && (
				<Dropdown onClose={() => setDropdownVisible(false)}>
					<div className='flex flex-col gap-2'>
						<NavBar className='[display:inherit] [flex-flow:inherit] [gap:inherit] [&>*:nth-child(even):not(:hover)]:bg-header-dropdown-bg-even' />
						<div className='[display:inherit] [&>*]:w-full'>
							{props.children}
						</div>
					</div>
				</Dropdown>
			)}
		</header>
	);
}
