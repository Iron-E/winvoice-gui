'use client';

import * as navigation from 'next/navigation';
import Link from 'next/link';
import type { ClassName } from '../props-with';
import { Route } from '../../api';

const COMMON_LINK_STYLE = 'mx-1 px-2 py-1 border-2 rounded xl:hover:border-green-300 duration-200';
const CURRENT_LINK_STYLE = `${COMMON_LINK_STYLE} bg-green-300 border-green-400 text-gray-950`;
const INACTIVE_LINK_STYLE = `${COMMON_LINK_STYLE} border-transparent hover:border-green-400`;

/** @return the navigation bar for the given `current` page. */
export function NavBar(props: ClassName): React.ReactElement {
	const PATH_NAME = navigation.usePathname();

	return (
		<nav className={props.className}>
			{Object.entries(Route).map(([name, route]) => (
				<Link className={PATH_NAME == route ? CURRENT_LINK_STYLE : INACTIVE_LINK_STYLE} href={route} key={route}>
					{name}
				</Link>
			))}
		</nav>
	);
}
