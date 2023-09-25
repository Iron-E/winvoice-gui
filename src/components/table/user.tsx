'use client';

import React from 'react';
import type { BaseProps, OrderProps } from './props';
import type { Department, Employee, Role, User } from '@/schema'
import {
	EmployeeTable,
	employeeValuators,
	Order,
	OrderedData,
	ROLE_VALUATORS,
	RoleTable,
	Table,
	Td,
	Tr,
	type UseOrder,
	type Valuators,
	useOrder,
	useRowEventHandlers,
} from '../table';
import { UserForm } from '../form';
import { Route } from '@/api';
import { getId } from '@/utils';
import { useApiContext } from '../api';

/** the headers of the {@link UserTable}. */
const HEADERS = ['ID', 'Password Set', 'Username', 'Employee', 'Role'] as const;

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link User}
 */
export function userValuators(employeeKey: keyof Employee, employeeDepartmentKey: keyof Department, roleKey: keyof Role): Valuators<User> {
	return {
		employee: { key: employeeKey, valuators: employeeValuators(employeeDepartmentKey) },
		role: { key: roleKey, valuators: ROLE_VALUATORS },
	};
}

/** @returns {@link useOrder} specialized for a {@link User}. */
export function useUserOrder(): UseOrder<User> {
	return useOrder('username');
}

/** @returns a table which displays {@link User}s in a customizable manner. */
export function UserTable(props:
	& BaseProps<User, 'id'>
	& OrderProps<'employee', Employee>
	& OrderProps<'employeeDepartment', Department>
	& OrderProps<'role', Role>
): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.User,
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
