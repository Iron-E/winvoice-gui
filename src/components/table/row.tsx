import type { Children, On } from "../props-with";
import type { Currency } from "@/schema";
import { CursorArrowRaysIcon } from "@heroicons/react/20/solid";
import { DeleteIcon } from "../icons";
import { EditIcon } from "../icons/edit";
import { FLEX, HOVER, ICON } from "../css";
import { SelectExportCurrency } from "../form/field/currency";
import { TableButton } from './button';
import { Td } from "./column";

export * from './row/hooks';

/** @returns a `<tr>` with the standard winvoice appearance. */
export function Tr(props:
	& Children
	& On<'delete' | 'edit' | 'select'>
	& On<'export', [currency?: Currency]>,
): React.ReactElement {
	return (
		<tr
			className={`${HOVER} [&:not(:last-child)]:border-b-[1px] \
odd:bg-table-row-bg-odd even:bg-table-row-bg-even border-table-row-border`}
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

					{props.onExport && <SelectExportCurrency onChange={props.onExport} />}

					{props.onSelect && (
						<TableButton onClick={props.onSelect}>
							<CursorArrowRaysIcon className={ICON} /> Select
						</TableButton>
					)}
				</span>
			</Td>

			{props.children}
		</tr>
	);
}
