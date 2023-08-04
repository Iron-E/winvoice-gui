'use client';

import * as navigation from 'next/navigation';
import Link from 'next/link';
import { FLEX } from '../css';
import { routes } from '../../api';

const COMMON_LINK_STYLE = 'mx-1 px-2 py-1 border-2 rounded hover:border-green-200 duration-200';
const CURRENT_LINK_STYLE = `${COMMON_LINK_STYLE} bg-green-300 border-green-400 text-gray-950`;
const INACTIVE_LINK_STYLE = `${COMMON_LINK_STYLE} border-transparent`;

const ROUTES = {
	[routes.CONTACT]: 'Contact',
	[routes.DEPARTMENT]: 'Department',
	[routes.EMPLOYEE]: 'Employee',
	[routes.EXPENSE]: 'Expense',
	[routes.JOB]: 'Job',
	[routes.LOCATION]: 'Location',
	[routes.ORGANIZATION]: 'Organization',
	[routes.ROLE]: 'Role',
	[routes.TIMESHEET]: 'Timesheet',
	[routes.USER]: 'User',
} as const;

/**
 * @return the navigation bar for the given `current` page.
 */
export function NavBar(): React.ReactElement {
	const PATH_NAME = navigation.usePathname();

	return (
		<nav className={`${FLEX} justify-center`}>
			{Object.entries(ROUTES).map(([route, name]) => (
				<Link className={PATH_NAME == route ? CURRENT_LINK_STYLE : INACTIVE_LINK_STYLE} href={route} key={route}>
					{name}
				</Link>
			))}
		</nav>
	);
}
