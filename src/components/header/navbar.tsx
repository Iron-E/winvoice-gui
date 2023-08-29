'use client';

import * as navigation from 'next/navigation';
import Link from 'next/link';
import React from 'react';
import type { Children, Class } from '../props-with';
import type { LookupTable, Props } from '@/utils';
import { CLICKABLE } from './style';
import { HOVER, ICON } from '../css';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Route } from '@/api';

/** Properties accepted by a {@link Link}. */
type LinkProps = Props<typeof Link>;

/** A link in a {@link NavEntry}. */
function NavLink(props: Children & { href: LinkProps['href'] }): React.ReactElement {
	return (
		<Link
			className={`${HOVER} p-1 border-2 xl:border-0 w-[10vmax] xl:w-full \
hover:border-navbar-link-border bg-navbar-link-bg xl:bg-transparent xl:hover:bg-navbar-link-bg-hover-xl \
text-center xl:text-left`}
			href={props.href}
		>
			{props.children}
		</Link>
	);
}

/** The CSS styles that all {@link Navbar} {@link Links} share. */
const COMMON_ENTRY_STYLE = `${CLICKABLE} group flex justify-between \
xl:border-b-0 xl:hover:rounded-b-none \
hover:shadow-none hover:border-navbar-entry-bg-current \
xl:text-center border-header-dropdown-bg xl:border-header-bg` as const;

/** The CSS style of the current {@link Link}. */
const CURRENT_ENTRY_STYLE = `${COMMON_ENTRY_STYLE} bg-navbar-entry-bg-current` as const;

/** The CSS style of inactive {@link Link}s. */
const INACTIVE_ENTRY_STYLE = `${COMMON_ENTRY_STYLE} hover:bg-navbar-entry-bg-current` as const;

/** A few of the {@link NavEntry | entries} are not happy with the default translation on `xl:` devices. */
const ENTRY_XL_TRANSLATION_OFF_BY_ONE: Partial<LookupTable<Route, true>> = {
	[Route.Department]: true,
	[Route.Job]: true,
};

/** A few of the {@link NavEntry | entries} are not happy with the default translation on `2xl:` devices. */
const ENTRY_2XL_TRANSLATION_OFF_BY_ONE: Partial<LookupTable<Route, true>> = {
	[Route.Organization]: true,
	[Route.User]: true,
};

/** An entry in the {@link NavBar}. */
function NavEntry(props: Class & Children & { route: Route }): React.ReactElement {
	return (
		<div className={props.className}>
			<span className='flex-grow self-center'>
				{props.children}
			</span>

			<div className={`xl:fixed flex flex-grow gap-1 justify-end xl:hidden xl:group-hover:flex xl:flex-col xl:justify-around \
xl:p-2 min-w-[10rem] xl:top-[2.5rem] xl:rounded-b-md xl:rounded-tr-md \
${ENTRY_XL_TRANSLATION_OFF_BY_ONE[props.route] ? 'xl:-translate-x-[0.57rem]' : 'xl:-translate-x-[0.56rem]'} \
${ENTRY_2XL_TRANSLATION_OFF_BY_ONE[props.route] ? '2xl:-translate-x-[0.57rem]' : '2xl:-translate-x-[0.56rem]'} \
xl:bg-navbar-entry-bg-current`}>
				<NavLink href={`${props.route}/new`}>
					<PlusIcon className={ICON} /> New
				</NavLink>

				<NavLink href={props.route}>
					<MagnifyingGlassIcon className={ICON} /> Search
				</NavLink>
			</div>
		</div>
	);
}

/** The {@link Route}s which are to be hidden in the {@link Navbar}. */
const ROUTE_HIDDEN: Partial<LookupTable<Route, true>> = {
	[Route.Export]: true,
	[Route.Login]: true,
	[Route.Logout]: true,
	[Route.WhoAmI]: true,
};

/** The {@link Link}s which are to be shown in the {@link Navbar}. */
const ROUTES: ReadonlyArray<[string, Route]> = Object.entries(Route).filter(([_, route]) => !ROUTE_HIDDEN[route]);


/** @return the navigation bar for the given `current` page. */
export function NavBar(props: Class): React.ReactElement {
	const URL = navigation.usePathname();
	return (
		<nav className={props.className}>
			{ROUTES.map(([k, v]) => (
				<NavEntry className={URL == v ? CURRENT_ENTRY_STYLE : INACTIVE_ENTRY_STYLE} key={k} route={v}>
					{k}
				</NavEntry>
			))}
		</nav>
	);
}
