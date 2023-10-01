import type { Organization } from "@/schema";
import { type UseOrder, useOrder } from "../order";

/** @returns {@link useOrder} specialized for a {@link Organization}. */
export function useOrganizationOrder(): UseOrder<Organization> {
	return useOrder('name');
}
