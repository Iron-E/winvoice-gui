import type { Children } from "../props-with";
import { PAD } from "../css";

/** The style of a {@link Td}. */
export const COLUMN_STYLE = `${PAD} [&:not(:last-child)]:border-r-[1px] border-table-col-border` as const;
const COLUMN_STYLE_NOWRAP = `${PAD} [&:not(:last-child)]:border-r-[1px] border-table-col-border whitespace-nowrap` as const;

/** @return a `<td>` with the standard winvoice appearance. */
export function Td(props: Children & { wrap?: boolean }): React.ReactElement {
	return (
		<td className={props.wrap === false ? COLUMN_STYLE_NOWRAP : COLUMN_STYLE}>
			{props.children}
		</td>
	);
}
