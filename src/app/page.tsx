import { LandscapeSpan, PortraitSpan } from 'components';

export default function Page(): React.ReactElement {
	return (
		<main>
			<p>
				Welcome. To get started, you can click on any of the links&nbsp;
				<PortraitSpan>in the dropdown</PortraitSpan>
				<LandscapeSpan>above</LandscapeSpan>
				.
			</p>
		</main>
	);
}
