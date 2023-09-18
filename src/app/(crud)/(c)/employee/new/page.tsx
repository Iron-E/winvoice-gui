'use client';

import React from 'react';
import type { Employee } from '@/schema';
import { EmployeeForm, EmployeeTable, employeeValuators, useDepartmentOrder, useOrderedData } from '@/components';

export default function Page(): React.ReactElement {
	const [DEPARTMENT_ORDER, setDepartmentOrder] = useDepartmentOrder();
	const ORDERED_DATA = useOrderedData<Employee>('name', employeeValuators(DEPARTMENT_ORDER.column));

	return <>
		<EmployeeForm
			id='new-employee-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={e => ORDERED_DATA.append(e)}
		/>

		{ORDERED_DATA.data.length > 0 && (
			<EmployeeTable
				departmentOrder={DEPARTMENT_ORDER}
				onReorderDepartment={order => {
					setDepartmentOrder(order);
					ORDERED_DATA.refresh(employeeValuators(order.column));
				}}
				orderedData={ORDERED_DATA}
			/>
		)}
	</>;
}
