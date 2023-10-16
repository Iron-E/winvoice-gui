import type { Location } from '@/schema';
import { UseOrder, useOrder } from '../../order';

/** @returns {@link useOrder} specialized for a {@link Location}. */
export function useLocationOrder(): UseOrder<Location> {
	return useOrder('name');
}
