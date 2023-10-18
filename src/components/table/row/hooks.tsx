import type { FieldName, NonNullUnit, Opt } from "@/utils";
import { AsyncOn } from "@/components/props-with";
import { Client, ShowMessage } from "@/components";
import { ConfirmModal, Modal } from "@/components";
import { OrderedData } from "../order";
import { useModalVisibility } from "@/hooks";
import { UserInputRoute } from "@/api";

/** The actions which may be performed on a row. */
type RowEvent<T> = {
	action: 'delete' | 'edit',
	data: NonNullUnit<T>,
};

/** @returns a tuple which first contains the handler for the given {@link Tr | row} action, and second, a setter for the current row action. */
export function useRowEventHandlers<T extends {}, Id extends FieldName>(
	orderedData: OrderedData<T>,
	client: Readonly<Client>,
	showMessage: ShowMessage,
	route: UserInputRoute,
	confirmDeleteMessage: (value: NonNullUnit<T>) => string,
	getId: (value: NonNullUnit<T>) => Id,
	EditForm: (props: AsyncOn<'submit', [value: NonNullUnit<T>]> & {
		initialValues: NonNullUnit<T>,
	}) => React.ReactElement,
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
					initialValues={MODAL_VISIBLE.data}
					onSubmit={async l => {
						await orderedData.edit(
							client,
							showMessage,
							route,
							{ [getId(l)]: l } as Record<Id, NonNullUnit<T>>,
							getId,
						);
						setModalVisible(null);
					}}
				/>
			</Modal>
		),
		setModalVisible,
	];
}
