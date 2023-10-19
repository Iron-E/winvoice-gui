'use client';

import React from 'react';
import type { BaseProps, OrderProps } from './props';
import type { Department, Employee } from '@/schema'
import { DepartmentTable } from './department';
import { EmployeeForm } from '../form';
import { getId } from '@/utils';
import { OrderedData } from './order';
import { Route } from '@/api';
import { Table } from '../table';
import { Td } from './column';
import { Tr, useRowEventHandlers } from './row';
import { useApiContext } from '../api';

export * from './employee/valuators';

/** the headers of the {@link EmployeeTable}. */
const HEADERS = ['ID', 'Active', 'Name', 'Title', 'Department'] as const;

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
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: e }) : undefined}
					onEdit={() => setRowEvent({ action: 'edit', data: e })}
					onSelect={props.onRowSelect && (() => props.onRowSelect!(e))}
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
