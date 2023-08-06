import * as props_with from "./props-with";

/** The properties of a {@link Dim}. */
export type Props = React.PropsWithChildren<props_with.Click<{
	/** how much of the background page can show through the dim. */
	opacity: 0 | 5 | 10 | 20 | 25 | 30 | 40 | 50 | 60 | 70 | 75 | 80 | 90 | 95 | 100,
}>>;

/** @return a floating `div` which dims the screen at `z-0`. */
export function Dim(props: Props): React.ReactElement {
	return (
		<div className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-${props.opacity} z-0`} onClick={props.onClick}>
			{props.children}
		</div>
	);
}
