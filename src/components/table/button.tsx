import type { Children, Click } from "../props-with";
import { HOVER, PAD } from "../css";

/** @return a `<button>` with the standard winvoice appearance. */
export function TableButton(props: Children & Click): React.ReactElement {
	return (
		<button
			className={`${PAD} ${HOVER} bg-table-button-bg hover:bg-table-button-bg-hover whitespace-nowrap`}
			onClick={props.onClick && (e => {
				e.preventDefault();
				// @ts-ignore
				props.onClick(e)
			})}
		>
			{props.children}
		</button>
	);
}
