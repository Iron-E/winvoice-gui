import type { FieldName, Opt } from "@/utils";
import type { AsyncOn, Children, Click, On } from "../props-with";
import { Client } from "../api";
import { ConfirmModal, Modal } from "../modal";
import { FLEX, HOVER, ICON } from "../css";
import { OrderedData } from "./order";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { ShowMessage } from "../messages";
import { TableButton } from './button';
import { Td } from "./column";
import { useModalVisibility } from "@/hooks";
import { UserInputRoute } from "@/api";

/** The actions which may be performed on a row. */
type RowEvent<T> = {
	action: 'delete' | 'edit',
	data: T,
};

/** @returns a tuple which first contains the handler for the given {@link Tr | row} action, and second, a setter for the current row action. */
export function useRowEventHandlers<T, Id extends FieldName>(
	orderedData: OrderedData<T>,
	client: Readonly<Client>,
	showMessage: ShowMessage,
	route: UserInputRoute,
	confirmDeleteMessage: (value: T) => string,
	getId: (value: T) => Id,
	EditForm: (props: AsyncOn<'submit', [value: T]> & { allFields: true, initialValues: T }) => React.ReactElement,
): [Opt<React.ReactElement>, ReturnType<typeof useModalVisibility<RowEvent<T>>>[1]] {
	const [MODAL_VISIBLE, setModalVisible] = useModalVisibility<RowEvent<T>>();
	return [
		MODAL_VISIBLE && (MODAL_VISIBLE.action === 'delete'
			? <ConfirmModal
				onClose={setModalVisible}
				onConfirm={async () => await orderedData.delete(client, showMessage, route, [MODAL_VISIBLE.data])}
				message={<>the {confirmDeleteMessage(MODAL_VISIBLE.data)} should be <b>permanently</b> deleted</>}
			/>
			: <Modal onClose={setModalVisible}>
				<EditForm
					allFields={true}
					initialValues={MODAL_VISIBLE.data}
					onSubmit={async l => {
						await orderedData.edit(client, showMessage, route, { [getId(l)]: l } as Record<Id, T>, getId);
						setModalVisible(null);
					}}
				/>
			</Modal>
		),
		setModalVisible,
	];
}

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
							<TrashIcon className={ICON} /> Delete
						</TableButton>
					)}

					{props.onEdit && (
						<TableButton onClick={props.onEdit}>
							<PencilIcon className={ICON} /> Edit
						</TableButton>
					)}
				</span>
			</Td>

			{props.children}
		</tr>
	);
}
