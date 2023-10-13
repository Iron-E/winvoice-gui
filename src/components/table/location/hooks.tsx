import type { Location } from '@/schema';
import type { Maybe } from '@/utils';
import { LocationTable } from '../location';
import { locationValuators } from './valuators';
import { type OrderedData, type UseOrder, useOrder, useOrderedData } from "../order";

/** @returns {@link useOrder} specialized for a {@link Location}. */
export function useLocationOrder(): UseOrder<Location> {
	return useOrder('name');
}

export function useLocationTable(): [OrderedData<Location>, Maybe<React.ReactElement>] {
	const [OUTER_ORDER, setOuterOrder] = useLocationOrder();
	const ORDERED_DATA = useOrderedData<Location>('name', locationValuators(OUTER_ORDER.column));

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
