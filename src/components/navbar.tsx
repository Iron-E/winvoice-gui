'use client';

import Link from 'next/link';
import * as navigation from 'next/navigation';
import { routes } from '../api';

const COMMON_LINK_STYLE = 'border-2 mx-1 px-2 py-1 rounded';
const CURRENT_LINK_STYLE = `${COMMON_LINK_STYLE} bg-gray-800 border-gray-800 text-gray-50`;
const INACTIVE_LINK_STYLE = `${COMMON_LINK_STYLE} border-transparent hover:border-gray-800 duration-200`;

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
 * @param current the current page being shown.
 * @return the navigation bar for the given `current` page.
 */
export function NavBar(): React.ReactElement {
	const PATH_NAME = navigation.usePathname();

	return (
		<nav className='flex items-center justify-center content-around'>
			{Object.entries(ROUTES).map(([route, name]) => (
				<Link className={PATH_NAME == route ? CURRENT_LINK_STYLE : INACTIVE_LINK_STYLE} href={route} key={route}>{name}</Link>
			))}
		</nav>
	);
}
