import type { Role } from "@/schema";
import { type UseOrder, useOrder } from "../order";

/** @returns {@link useOrder} specialized for a {@link Role}. */
export function useRoleOrder(): UseOrder<Role> {
	return useOrder('name');
}
