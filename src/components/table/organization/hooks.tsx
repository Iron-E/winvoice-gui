import type { Organization } from "@/schema";
import { OrganizationTable } from "../organization";
import { organizationValuators } from './valuators';
import { type UseOrder, type UseTable, useOrder, useOrderedData } from "../order";
import { useLocationOrder } from "../location/hooks";

const COLUMN = 'name' as const;

/** @returns {@link useOrder} specialized for a {@link Organization}. */
export function useOrganizationOrder(): UseOrder<Organization> {
	return useOrder(COLUMN);
}

export const useOrganizationTable: UseTable<Organization> = handler => {
	const [LOCATION_ORDER, setLocationOrder] = useLocationOrder();
	const [OUTER_ORDER, setOuterOrder] = useLocationOrder();

	const KEYS = {
		location: LOCATION_ORDER.column,
		outerLocation: OUTER_ORDER.column,
	} as const;
	const [ORDERED_DATA, swapKey] = useOrderedData<Organization, typeof KEYS>(COLUMN, organizationValuators, KEYS);

	return [ORDERED_DATA, ORDERED_DATA.data.length < 1 ? undefined : (
		<OrganizationTable
			locationOrder={LOCATION_ORDER}
			onReorderLocation={ORDERED_DATA.refreshOnReorder(setLocationOrder, swapKey('location'))}
			onReorderOuterLocation={ORDERED_DATA.refreshOnReorder(setOuterOrder, swapKey('outerLocation'))}
			onRowSelect={handler}
			orderedData={ORDERED_DATA}
			outerLocationOrder={LOCATION_ORDER}
		/>
	)];
}
