'use client';

import React from 'react';
import type { BaseProps } from './props';
import type { Department, Employee } from '@/schema'
import type { On } from '../props-with';
import { DepartmentOrder, DepartmentTable, OrderedData, Table, Td, Tr, type Valuators, useOrder, useRowEventHandlers } from '../table';
import { EmployeeForm } from '../form';
import { Route } from '@/api';
import { useApiContext } from '../api';

/** the headers of the {@link EmployeeTable}. */
const HEADERS = ['Active', 'Department', 'ID', 'Name', 'Title'] as const;

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Employee}
 */
export function employeeValuators(departmentKey: keyof Department): Valuators<Employee> {
	return { department: { key: departmentKey } };
}

/** The {@link Order} of {@link Employee}s. */
export type EmployeeOrder = ReturnType<typeof useOrder<keyof Employee>>;

/** @returns {@link useOrder} specialized for a {@link Employee}. */
export function useEmployeeOrder(): EmployeeOrder {
	return useOrder<keyof Employee>('name');
}

/** @returns a table which displays {@link Employee}s in a customizable manner. */
export function EmployeeTable(props:
	& BaseProps<Employee, 'id'>
	& Required<On<'reorderDepartment', Parameters<DepartmentOrder[1]>>>
	& { departmentOrder: DepartmentOrder[0] }
): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.Employee,
		e => `employee ${e.id} "${e.name}"`,
		e => e.id,
		(props) => <EmployeeForm  {...props} id='edit-employee-form' />,
	);

	return <>
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(e => (
				<Tr
					selected={e.id === props.selectedRow}
					key={e.id}
					onClick={props.onRowSelect && (() => props.onRowSelect!(e))}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: e }) : undefined}
					// ?
					onEdit={() => setRowEvent({ action: 'edit', data: e })}
				>
					<Td>{e.active}</Td>
					<Td>
						<DepartmentTable
							deletable={false}
							orderedData={new OrderedData(props.departmentOrder, props.onReorderDepartment, [e.department])}
						/>
					</Td>
					<Td>{e.id}</Td>
					<Td>{e.name}</Td>
					<Td>{e.title}</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
