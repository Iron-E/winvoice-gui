import type { Contact } from "@/schema";
import { ContactTable } from "../contact";
import { contactValuators } from './valuators';
import { type UseOrder, type UseTable, useOrder, useOrderedData } from "../order";
import { useLocationOrder } from "../location/hooks";

const COLUMN = 'label' as const;

/** @returns {@link useOrder} specialized for a {@link Contact}. */
export function useContactOrder(): UseOrder<Contact> {
	return useOrder(COLUMN);
}

export const useContactTable: UseTable<Contact> = handler => {
	const [ADDRESS_ORDER, setAddressOrder] = useLocationOrder();
	const [OUTER_ADDRESS_ORDER, setOuterAddressOrder] = useLocationOrder();

	const KEYS = { address: ADDRESS_ORDER.column, outerAddress: OUTER_ADDRESS_ORDER.column } as const;
	const [ORDERED_DATA, swapKey] = useOrderedData<Contact, typeof KEYS>('label', contactValuators, KEYS);
	return [ORDERED_DATA, ORDERED_DATA.data.length < 1 ? undefined : (
		<ContactTable
			addressOrder={ADDRESS_ORDER}
			onReorderAddress={ORDERED_DATA.refreshOnReorder(setAddressOrder, swapKey('address'))}
			onReorderOuterAddress={ORDERED_DATA.refreshOnReorder(setOuterAddressOrder, swapKey('outerAddress'))}
			onRowSelect={handler}
			orderedData={ORDERED_DATA}
			outerAddressOrder={OUTER_ADDRESS_ORDER}
		/>
	)];
}
