import type { Employee } from "@/schema";
import { employeeValuators } from './valuators';
import { type UseOrder, type UseTable, useOrder, useOrderedData } from "../order";
import { useDepartmentOrder } from "../department/hooks";
import { EmployeeTable } from "../employee";

const COLUMN = 'name' as const;

/** @returns {@link useOrder} specialized for a {@link Employee}. */
export function useEmployeeOrder(): UseOrder<Employee> {
	return useOrder(COLUMN);
}

/** @returns {@link useOrder} specialized for a {@link Employee}. */
export function useEmployeeTable(): UseTable<Employee> {
	const [DEPARTMENT_ORDER, setDepartmentOrder] = useDepartmentOrder();
	const ORDERED_DATA = useOrderedData<Employee>(COLUMN, employeeValuators(DEPARTMENT_ORDER.column));
	return [ORDERED_DATA, ORDERED_DATA.data.length < 1 ? undefined : (
		<EmployeeTable
			departmentOrder={DEPARTMENT_ORDER}
			onReorderDepartment={order => {
				setDepartmentOrder(order);
				ORDERED_DATA.refresh(employeeValuators(order.column));
			}}
			orderedData={ORDERED_DATA}
		/>
	)];
}
