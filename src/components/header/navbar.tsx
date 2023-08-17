'use client';

import * as navigation from 'next/navigation';
import Link from 'next/link';
import type { Class } from '../props-with';
import { CLICKABLE } from './style';
import { Route } from '../../api';

/** The CSS styles that all {@link Navbar} {@link Links} share. */
const COMMON_LINK_STYLE = `${CLICKABLE} hover:border-navbar-link-bg-current` as const;

/** The CSS style of the current {@link Link}. */
const CURRENT_LINK_STYLE = `${COMMON_LINK_STYLE} bg-navbar-link-bg-current border-header-dropdown-bg xl:border-header-bg` as const;

/** The CSS style of inactive {@link Link}s. */
const INACTIVE_LINK_STYLE = `${COMMON_LINK_STYLE} border-transparent hover:border-header-bg` as const;

/** The {@link Route}s which are to be hidden in the {@link Navbar}. */
const HIDDEN_LINKS: Readonly<Partial<Record<Route, true>>> = {
	[Route.Export]: true,
	[Route.Login]: true,
	[Route.Logout]: true,
	[Route.WhoAmI]: true,
};

/** The {@link Link}s which are to be shown in the {@link Navbar}. */
const LINKS: ReadonlyArray<[string, Route]> = Object.entries(Route).filter(([_, route]) => !HIDDEN_LINKS[route]);

/** @return the navigation bar for the given `current` page. */
export function NavBar(props: Class): React.ReactElement {
	const PATH_NAME = navigation.usePathname();

	return (
		<nav className={props.className}>
			{LINKS.map(([name, route]) => (
				<Link className={PATH_NAME == route ? CURRENT_LINK_STYLE : INACTIVE_LINK_STYLE} href={route} key={route}>
					{name}
				</Link>
			))}
		</nav>
	);
}
