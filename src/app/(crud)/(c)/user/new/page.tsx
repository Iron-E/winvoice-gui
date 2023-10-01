'use client';

import React from 'react';
import type { User } from '@/schema';
import {
	useDepartmentOrder,
	useEmployeeOrder,
	useOrderedData,
	UserForm,
	useRoleOrder,
	UserTable,
	userValuators,
} from '@/components';

export default function Page(): React.ReactElement {
	const [DEPARTMENT_ORDER, setDepartmentOrder] = useDepartmentOrder();
	const [EMPLOYEE_ORDER, setEmployeeOrder] = useEmployeeOrder();
	const [ROLE_ORDER, setRoleOrder] = useRoleOrder();

	const KEYS = {
		employee: EMPLOYEE_ORDER.column,
		employeeDepartment: DEPARTMENT_ORDER.column,
		role: ROLE_ORDER.column,
	} as const;
	const [ORDERED_DATA, swapKey] = useOrderedData<User, typeof KEYS>('username', userValuators, KEYS);

	return <>
		<UserForm
			id='new-employee-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={e => ORDERED_DATA.append(e)}
		/>

		{ORDERED_DATA.data.length > 0 && (
			<UserTable
				employeeDepartmentOrder={DEPARTMENT_ORDER}
				employeeOrder={EMPLOYEE_ORDER}
				onReorderEmployee={ORDERED_DATA.refreshOnReorder(setEmployeeOrder, swapKey('employee'))}
				onReorderEmployeeDepartment={ORDERED_DATA.refreshOnReorder(setDepartmentOrder, swapKey('employeeDepartment'))}
				onReorderRole={ORDERED_DATA.refreshOnReorder(setRoleOrder, swapKey('role'))}
				orderedData={ORDERED_DATA}
				roleOrder={ROLE_ORDER}
			/>
		)}
	</>;
}
