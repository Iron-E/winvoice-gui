import { NavBar } from '../../components';
import { routes } from '../../api';

const NAV_BAR = NavBar({current: routes.EMPLOYEE});

export default function Page(): React.ReactElement {
	return (
		<div>
			{NAV_BAR}
		</div>
	);
}
