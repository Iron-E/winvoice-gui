import { NavBar } from '../../components';
import { routes } from '../../api';

const NAV_BAR = NavBar({current: routes.LOCATION});

export default function Page(): React.ReactElement {
	return (
		<div>
			{NAV_BAR}
		</div>
	);
}
