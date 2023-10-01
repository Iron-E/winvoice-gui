import type { Department } from "@/schema";
import { type UseOrder, useOrder } from "../order";

/** @returns {@link useOrder} specialized for a {@link Department}. */
export function useDepartmentOrder(): UseOrder<Department> {
	return useOrder('name');
}
