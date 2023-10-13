import type { Role } from "@/schema";
import { ROLE_VALUATORS } from "../role/valuators";
import { RoleTable } from "../role";
import { type UseOrder, type UseTable, useOrder, useOrderedData } from "../order";

const COLUMN = 'name' as const;

/** @returns {@link useOrder} specialized for a {@link Role}. */
export function useRoleOrder(): UseOrder<Role> {
	return useOrder(COLUMN);
}

export function useRoleTable(): UseTable<Role> {
	const ORDERED_DATA = useOrderedData<Role>(COLUMN, ROLE_VALUATORS);
	return [ORDERED_DATA, ORDERED_DATA.data.length < 1 ? undefined : <RoleTable orderedData={ORDERED_DATA} />];
}
