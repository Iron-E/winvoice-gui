import type { Children, Click } from "./props-with";

/** The properties of a {@link Dim}. */
export type Props = Children<Click<{
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
