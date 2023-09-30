import type { Children, Click, On } from "../props-with";
import { DeleteIcon } from "../icons";
import { EditIcon } from "../icons/edit";
import { FLEX, HOVER } from "../css";
import { TableButton } from './button';
import { Td } from "./column";

export * from './row/hooks';

/** @returns a `<tr>` with the standard winvoice appearance. */
export function Tr(props: Children & Click & On<'delete'> & On<'edit'> & { selected?: boolean }): React.ReactElement {
	return (
		<tr
			className={`${HOVER} [&:not(:last-child)]:border-b-[1px] \
${props.selected ? 'bg-gradient-radial from-table-row-bg-even from-95% to-table-row-bg-selected' : 'odd:bg-table-row-bg-odd even:bg-table-row-bg-even'} \
border-table-row-border \
${props.onClick != undefined ? 'cursor-pointer' : ''}`}
			title={props.onClick && 'Click to select this row as the item you were searching for'}
			onClick={props.onClick && (e => {
				e.stopPropagation();
				props.onClick!(e);
			})}
		>
			<Td>
				<span className={`${FLEX} py-1 justify-between gap-2`}>
					{props.onDelete && (
						<TableButton onClick={props.onDelete}>
							<DeleteIcon />
						</TableButton>
					)}

					{props.onEdit && (
						<TableButton onClick={props.onEdit}>
							<EditIcon />
						</TableButton>
					)}
				</span>
			</Td>

			{props.children}
		</tr>
	);
}
