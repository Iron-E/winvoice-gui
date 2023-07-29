import Link from 'next/link';
import { routes } from '../api';

const CURRENT_LINK_STYLE = "bg-gray-800 px-3 py-1 rounded text-gray-50";
const INACTIVE_LINK_STYLE = "mx-3";

const ROUTES = {
	[routes.CONTACT]: 'Contact',
	[routes.DEPARTMENT]: "Department",
	[routes.EMPLOYEE]: "Employee",
	[routes.EXPENSE]: "Expense",
	[routes.JOB]: "Job",
	[routes.LOCATION]: "Location",
	[routes.ORGANIZATION]: "Organization",
	[routes.ROLE]: "Role",
	[routes.TIMESHEET]: "Timesheet",
	[routes.USER]: "User",
} as const;

/**
 * @param current the current page being shown.
 * @return the navigation bar for the given `current` page.
 */
export function NavBar({ current }: { current?: keyof typeof ROUTES }): React.ReactElement {
	return (
		<nav className="flex items-center justify-center">
			{Object.entries(ROUTES).map(([route, name]) => (
				<Link className={current == route ? CURRENT_LINK_STYLE : INACTIVE_LINK_STYLE} href={route}>{name}</Link>
			))}
		</nav>
	);
}
