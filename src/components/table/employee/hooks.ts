import type { Employee } from "@/schema";
import { type UseOrder, useOrder } from "../order";

/** @returns {@link useOrder} specialized for a {@link Employee}. */
export function useEmployeeOrder(): UseOrder<Employee> {
	return useOrder('name');
}
