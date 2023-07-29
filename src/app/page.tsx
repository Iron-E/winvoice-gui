import { NavBar } from '../components';

const NAV_BAR = NavBar({});

export default function Page(): React.ReactElement {
	return (
		<div>
			{NAV_BAR}
		</div>
	);
}
