import type { Children, Click, On } from "../props-with";
import { Td } from "./column";
import { FLEX, HOVER, ICON } from "../css";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { TableButton } from './button';

/** @return a `<tr>` with the standard winvoice appearance. */
export function Tr(props: Children & Click & On<'delete'> & On<'edit'>): React.ReactElement {
	return (
		<tr
			className={`${HOVER} [&:not(:last-child)]:border-b-[1px] \
odd:bg-table-row-bg-odd even:bg-table-row-bg-even border-table-row-border`}
			onClick={props.onClick}
		>
			{props.children}

			<Td>
				<span className={`${FLEX} py-1 justify-between gap-2`}>
					<TableButton onClick={props.onDelete}>
						<TrashIcon className={ICON} /> Delete
					</TableButton>

					<TableButton onClick={props.onEdit}>
						<PencilIcon className={ICON} /> Edit
					</TableButton>
				</span>
			</Td>
		</tr>
	);
}
