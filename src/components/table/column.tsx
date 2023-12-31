import type { Children } from "../props-with";
import { PAD } from "../css";

/** The style of a {@link Td}. */
export const COLUMN_STYLE = `${PAD} [&:not(:last-child)]:border-r-[1px] border-table-col-border` as const;

/** @returns a `<td>` with the standard winvoice appearance. */
export function Td(props: Children): React.ReactElement {
	return (
		<td className={COLUMN_STYLE}>
			{props.children}
		</td>
	);
}
