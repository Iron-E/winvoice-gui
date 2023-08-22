import { Children } from './props-with';

/** A {@link React.JSX.IntrinsicElements.span | span} that only shows in landscape. */
export function LandscapeSpan(props: Children): React.ReactElement{
	return (
		<span className='hidden xl:inline'>
			{props.children}
		</span>
	);
}

/** A {@link React.JSX.IntrinsicElements.span | span} that only shows in portrait. */
export function PortraitSpan(props: Children): React.ReactElement{
	return (
		<span className='xl:hidden'>
			{props.children}
		</span>
	);
}
