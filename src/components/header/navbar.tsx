'use client';

import * as navigation from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import type { Children, Class } from '../props-with';
import type { Props } from '../../utils';
import { CLICKABLE } from './style';
import { ICON } from '../css';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Route } from '../../api';
import { PortraitSpan } from '../span';

/** Properties accepted by a {@link Link}. */
type LinkProps = Props<typeof Link>;

/** The {@link Route}s which are to be hidden in the {@link Navbar}. */
const HIDDEN_ROUTES: Readonly<Partial<Record<Route, true>>> = {
	[Route.Export]: true,
	[Route.Login]: true,
	[Route.Logout]: true,
	[Route.WhoAmI]: true,
};

/** The {@link Link}s which are to be shown in the {@link Navbar}. */
const ROUTES: ReadonlyArray<[string, Route]> = Object.entries(Route).filter(([_, route]) => !HIDDEN_ROUTES[route]);

/** The CSS styles that all {@link Navbar} {@link Links} share. */
const COMMON_ENTRY_STYLE = `${CLICKABLE} flex justify-between xl:[display:initial] xl:max-w-min group hover:border-navbar-entry-bg-current xl:text-center` as const;

/** The CSS style of the current {@link Link}. */
const CURRENT_ENTRY_STYLE = `${COMMON_ENTRY_STYLE} bg-navbar-entry-bg-current border-header-dropdown-bg xl:border-header-bg` as const;

/** The CSS style of inactive {@link Link}s. */
const INACTIVE_ENTRY_STYLE = `${COMMON_ENTRY_STYLE} border-transparent hover:border-header-bg` as const;

/** HACK: required or else the width of the {@link NavLink}s will be less than the initial width of a given {@link NavEntry}, causing jitter. */
const ENTRY_WIDTHS: Readonly<Partial<Record<Route, string>>> = {
	[Route.Department]: 'xl:min-w-[7.2rem]',
	[Route.Employee]: 'xl:min-w-[6.1rem]',
	[Route.Expense]: 'xl:min-w-[5.4rem]',
	[Route.Location]: 'xl:min-w-[5.5rem]',
	[Route.Organization]: 'xl:min-w-[7.7rem]',
	[Route.Timesheet]: 'xl:min-w-[6.3rem]',
};

/** A link in a {@link NavEntry}. */
function NavLink(props: Children & { href: LinkProps['href'] }): React.ReactElement {
	return (
		<Link
			className='px-1 xl:px-0 w-[10vmax] xl:w-[40%] xl:min-w-[2rem] border-2 xl:border-0 rounded-md \
hover:border-navbar-link-border bg-navbar-link-bg xl:bg-transparent xl:hover:bg-navbar-link-bg-hover-xl hover:shadow-md \
text-center duration-200'
			href={props.href}
		>
			{props.children}
		</Link>
	);
}

/** An entry in the {@link NavBar}. */
function NavEntry(props: Class & Children & { route: Route }): React.ReactElement {
	return (
		<div className={`${ENTRY_WIDTHS[props.route] || 'xl:min-w-[5.2rem]'} ${props.className}`}>
			<span className='flex-grow xl:group-hover:hidden'>
				{props.children}
			</span>

			<div className='flex flex-grow justify-end xl:justify-around gap-2 xl:gap-0 xl:hidden xl:group-hover:flex'>
				<NavLink href={`${props.route}/new`}>
					<PlusIcon className={ICON} />
					<PortraitSpan>New</PortraitSpan>
				</NavLink>

				<NavLink href={props.route}>
					<MagnifyingGlassIcon className={ICON} />
					<PortraitSpan>Search</PortraitSpan>
				</NavLink>
			</div>
		</div>
	);
}


/** @return the navigation bar for the given `current` page. */
export function NavBar(props: Class): React.ReactElement {
	const URL = navigation.usePathname();
	return (
		<nav className={props.className}>
			{ROUTES.map(([name, route]) => (
				<NavEntry className={URL == route ? CURRENT_ENTRY_STYLE : INACTIVE_ENTRY_STYLE} key={route} route={route}>
					{name}
				</NavEntry>
			))}
		</nav>
	);
}
