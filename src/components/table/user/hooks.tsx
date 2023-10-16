import type { User } from "@/schema";
import { type UseOrder, type UseTable, useOrder, useOrderedData } from "../order";
import { useDepartmentOrder } from "../department/hooks";
import { useEmployeeOrder } from "../employee/hooks";
import { useRoleOrder } from "../role/hooks";
import { userValuators } from "./valuators";
import { UserTable } from "../user";

const COLUMN = 'username' as const;

/** @returns {@link useOrder} specialized for a {@link User}. */
export function useUserOrder(): UseOrder<User> {
	return useOrder(COLUMN);
}

export const useUserTable: UseTable<User> = handler => {
	const [DEPARTMENT_ORDER, setDepartmentOrder] = useDepartmentOrder();
	const [EMPLOYEE_ORDER, setEmployeeOrder] = useEmployeeOrder();
	const [ROLE_ORDER, setRoleOrder] = useRoleOrder();

	const KEYS = {
		employee: EMPLOYEE_ORDER.column,
		employeeDepartment: DEPARTMENT_ORDER.column,
		role: ROLE_ORDER.column,
	} as const;

	const [ORDERED_DATA, swapKey] = useOrderedData<User, typeof KEYS>(COLUMN, userValuators, KEYS);
	return [ORDERED_DATA, ORDERED_DATA.data.length < 1 ? undefined : (
		<UserTable
			employeeDepartmentOrder={DEPARTMENT_ORDER}
			employeeOrder={EMPLOYEE_ORDER}
			onReorderEmployee={ORDERED_DATA.refreshOnReorder(setEmployeeOrder, swapKey('employee'))}
			onReorderEmployeeDepartment={ORDERED_DATA.refreshOnReorder(setDepartmentOrder, swapKey('employeeDepartment'))}
			onReorderRole={ORDERED_DATA.refreshOnReorder(setRoleOrder, swapKey('role'))}
			onRowSelect={handler}
			orderedData={ORDERED_DATA}
			roleOrder={ROLE_ORDER}
		/>
	)];
}
