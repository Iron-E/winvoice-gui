import * as props_with from "./props-with";

/** The properties of a {@link Dim}. */
export type Props = React.PropsWithChildren<props_with.Click<{
	/** how much of the background page can show through the dim. Should be 0–1 (inclusive).  */
	opacity: number,
}>>;

/** @return a floating `div` which dims the screen at `z-0`. */
export function Dim(props: Props): React.ReactElement {
	return (
		<div className={`fixed top-0 left-0 w-screen h-screen bg-black/[${props.opacity}] z-1`} onClick={props.onClick}>
			{props.children}
		</div>
	);
}
