import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { FLEX, HOVER, ICON, PAD } from "../css";
import type { Children, Click, On } from "../props-with";
import { Column } from "./column";

/** @return a `<button>` with the standard winvoice appearance. */
function Button(props: Children & Click): React.ReactElement {
	return (
		<button
			className={`${PAD} ${HOVER} bg-table-button-bg hover:bg-table-button-bg-hover`}
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

/** @return a `<tr>` with the standard winvoice appearance. */
export function Row(props: Children & Click & On<'delete'> & On<'edit'>): React.ReactElement {
	return (
		<tr
			className={`${HOVER} [&:not(:last-child)]:border-b-[1px] \
odd:bg-table-row-bg-odd even:bg-table-row-bg-even border-table-row-border`}
			onClick={props.onClick}
		>
			{props.children}

			<Column>
				<span className={`${FLEX} justify-between gap-2`}>
					<Button onClick={props.onDelete}>
						<TrashIcon className={ICON} /> Delete
					</Button>

					<Button onClick={props.onEdit}>
						<PencilIcon className={ICON} /> Edit
					</Button>
				</span>
			</Column>
		</tr>
	);
}
