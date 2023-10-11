'use client';

import React from 'react';
import type { BaseProps, OrderProps } from './props';
import type { Department, Employee, Role, User } from '@/schema'
import { EmployeeTable } from './employee';
import { getId } from '@/utils';
import { Order, OrderedData } from './order';
import { RoleTable } from './role';
import { Route } from '@/api';
import { Table } from '../table';
import { Td } from './column';
import { Tr, useRowEventHandlers } from './row';
import { useApiContext } from '../api';
import { UserForm } from '../form';

export * from './user/hooks';
export * from './user/valuators';

/** the headers of the {@link UserTable}. */
const HEADERS = ['ID', 'Password Set', 'Username', 'Employee', 'Role'] as const;

/** @returns a table which displays {@link User}s in a customizable manner. */
export function UserTable(props:
	& BaseProps<User, 'id'>
	& OrderProps<'employee', Employee>
	& OrderProps<'employeeDepartment', Department>
	& OrderProps<'role', Role>
): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		new OrderedData(
			props.orderedData.order,
			props.orderedData.setOrder,
			props.orderedData.data,
			props.orderedData.setData && (data => {
				props.orderedData.setData!(data.map(user => {
					if (
						user.password !== ''
						&& user.password !== props.orderedData.data.find(v => v.id === user.id)?.password
					) { // NOTE: the server separately stores its own value, but this is purely for cosmetics' sake
						user = { ...user, password_set: new Date() };
					}

					return user;
				}));
			}),
		),
		CLIENT,
		showMessage,
		Route.User,
		e => `user ${e.id} "${e.username}"`,
		getId,
		props => <UserForm  {...props} id='edit-user-form' />,
	);

	return <>
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order as Order<keyof Omit<User, 'password'>>}
		>
			{props.orderedData.data.map(u => (
				<Tr
					key={u.id}
					onClick={props.onRowSelect && (() => props.onRowSelect!(u))}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: u }) : undefined}
					onEdit={() => setRowEvent({ action: 'edit', data: u })}
					selected={u.id === props.selectedRow}
				>
					<Td>{u.id}</Td>
					<Td>{u.password_set?.toLocaleString()}</Td>
					<Td>{u.username}</Td>
					<Td>
						{u.employee && (
							<EmployeeTable
								deletable={false}
								departmentOrder={props.employeeDepartmentOrder}
								onReorderDepartment={props.onReorderEmployeeDepartment}
								orderedData={new OrderedData(
									props.employeeOrder,
									props.onReorderEmployee,
									[u.employee],
									d => props.orderedData.swap(getId, u.id, { ...u, employee: d[0]! }),
								)}
							/>
						)}
					</Td>
					<Td>
						<RoleTable
							deletable={false}
							orderedData={new OrderedData(
								props.roleOrder,
								props.onReorderRole,
								[u.role],
								d => props.orderedData.swap(getId, u.id, { ...u, role: d[0]! }),
							)}
						/>
					</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
