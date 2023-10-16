import type { Department } from "@/schema";
import { type UseOrder, type UseTable, useOrder, useOrderedData } from "../order";
import { DepartmentTable } from "../department";

const COLUMN = 'name' as const;

/** @returns {@link useOrder} specialized for a {@link Department}. */
export function useDepartmentOrder(): UseOrder<Department> {
	return useOrder(COLUMN);
}

export const useDepartmentTable: UseTable<Department> = handler => {
	const ORDERED_DATA = useOrderedData<Department>(COLUMN);
	return [ORDERED_DATA, ORDERED_DATA.data.length < 1 ? undefined : (
		<DepartmentTable onRowSelect={handler} orderedData={ORDERED_DATA} />
	)];
}
