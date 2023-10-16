import type { Location } from '@/schema';
import { LocationTable } from '../../location';
import { locationValuators } from '../valuators';
import { useLocationOrder } from './order';
import { useOrderedData, type UseTable } from "../../order";

export const useLocationTable: UseTable<Location> = handler => {
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
			onRowSelect={handler}
			orderedData={ORDERED_DATA}
			outerOrder={OUTER_ORDER}
		/>
	)];
}
