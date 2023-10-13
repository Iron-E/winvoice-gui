import type { Location } from '@/schema';
import { LocationTable } from '../location';
import { locationValuators } from './valuators';
import { type UseOrder, useOrder, useOrderedData, type UseTable } from "../order";

const COLUMN = 'name' as const;

/** @returns {@link useOrder} specialized for a {@link Location}. */
export function useLocationOrder(): UseOrder<Location> {
	return useOrder(COLUMN);
}

export function useLocationTable(): UseTable<Location> {
	const [OUTER_ORDER, setOuterOrder] = useLocationOrder();
	const ORDERED_DATA = useOrderedData<Location>(COLUMN, locationValuators(OUTER_ORDER.column));
	return [ORDERED_DATA, ORDERED_DATA.data.length < 1 ? undefined : (
		<LocationTable
			onReorderOuter={
				order => {
					setOuterOrder(order);
					ORDERED_DATA.refresh(locationValuators(order.column));
				}
			}
			orderedData={ORDERED_DATA}
			outerOrder={OUTER_ORDER}
		/>
	)];
}
