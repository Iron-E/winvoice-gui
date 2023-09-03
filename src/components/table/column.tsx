import type { Children } from "../props-with";
import { PAD } from "../css";

/** The style of a {@link Column}. */
export const COLUMN_STYLE = `${PAD} [&:not(:last-child)]:border-r-[1px] border-table-col-border` as const;

/** @return a `<td>` with the standard winvoice appearance. */
export function Column(props: Children): React.ReactElement {
	return (
		<td className={COLUMN_STYLE}>
			{props.children}
		</td>
	);
}
