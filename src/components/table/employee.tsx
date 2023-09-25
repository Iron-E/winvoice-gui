'use client';

import React from 'react';
import type { BaseProps } from './props';
import type { Department, Employee } from '@/schema'
import { DepartmentTable, OrderedData, Table, Td, Tr, type Valuators, useOrder, useRowEventHandlers, OrderProps as OrderProps } from '../table';
import { EmployeeForm } from '../form';
import { Route } from '@/api';
import { useApiContext } from '../api';
import { getId } from '@/utils';

/** the headers of the {@link EmployeeTable}. */
const HEADERS = ['ID', 'Active', 'Name', 'Title', 'Department'] as const;

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Employee}
 */
export function employeeValuators(departmentKey: keyof Department): Valuators<Employee> {
	return { department: { key: departmentKey } };
}

/** @returns {@link useOrder} specialized for a {@link Employee}. */
export function useEmployeeOrder(): ReturnType<typeof useOrder<keyof Employee>> {
	return useOrder<keyof Employee>('name');
}

/** @returns a table which displays {@link Employee}s in a customizable manner. */
export function EmployeeTable(props:
	& BaseProps<Employee, 'id'>
	& OrderProps<'department', Department>
): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.Employee,
		e => `employee ${e.id} "${e.name}"`,
		getId,
		props => <EmployeeForm  {...props} id='edit-employee-form' />,
	);

	return <>
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(e => (
				<Tr
					key={e.id}
					onClick={props.onRowSelect && (() => props.onRowSelect!(e))}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: e }) : undefined}
					onEdit={() => setRowEvent({ action: 'edit', data: e })}
					selected={e.id === props.selectedRow}
				>
					<Td>{e.id}</Td>
					<Td>{e.active ? 'Yes' : 'No'}</Td>
					<Td>{e.name}</Td>
					<Td>{e.title}</Td>
					<Td>
						<DepartmentTable
							deletable={false}
							orderedData={new OrderedData(
								props.departmentOrder,
								props.onReorderDepartment,
								[e.department],
								d => props.orderedData.swap(getId, e.id, { ...e, department: d[0]! }),
							)}
						/>
					</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
