import type { Children, Click } from "../props-with";
import { HOVER, PAD } from "../css";

/** @returns a `<button>` with the standard winvoice appearance. */
export function TableButton(props: Children & Click): React.ReactElement {
	return (
		<button
			className={`${PAD} ${HOVER} bg-table-button-bg hover:bg-table-button-bg-hover whitespace-nowrap`}
			onClick={props.onClick && (async e => {
				e.preventDefault();
				await Promise.resolve(props.onClick!(e));
			})}
		>
			{props.children}
		</button>
	);
}