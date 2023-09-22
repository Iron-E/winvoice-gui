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
	const ORDERED_DATA = useOrderedData<User>('username', userValuators(
		EMPLOYEE_ORDER.column,
		DEPARTMENT_ORDER.column,
		ROLE_ORDER.column,
	));

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
				onReorderEmployee={order => {
					setEmployeeOrder(order);
					ORDERED_DATA.refresh(userValuators(order.column, DEPARTMENT_ORDER.column, ROLE_ORDER.column));
				}}
				onReorderEmployeeDepartment={order => {
					setDepartmentOrder(order);
					ORDERED_DATA.refresh(userValuators(EMPLOYEE_ORDER.column, order.column, ROLE_ORDER.column));
				}}
				onReorderRole={order => {
					setRoleOrder(order);
					ORDERED_DATA.refresh(userValuators(EMPLOYEE_ORDER.column, DEPARTMENT_ORDER.column, order.column));
				}}
				orderedData={ORDERED_DATA}
				roleOrder={ROLE_ORDER}
			/>
		)}
	</>;
}
