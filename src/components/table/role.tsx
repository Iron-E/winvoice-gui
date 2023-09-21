'use client';

import parse from 'parse-duration';
import React from 'react';
import type { BaseProps } from './props';
import type { Role } from '@/schema'
import { Table, Td, Tr, type Valuators, useOrder, useRowEventHandlers } from '../table';
import { getId } from '@/utils';
import { RoleForm } from '../form';
import { Route } from '@/api';
import { useApiContext } from '../api';

/** the headers of the {@link RoleTable}. */
const HEADERS = ['ID', 'Name', 'Password TTL'] as const;

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Organization}
 */
export const ROLE_VALUATORS: Readonly<Valuators<Role>> = { password_ttl: { map: parse } };

/** The {@link Order} of {@link Role}s. */
export type RoleOrder = ReturnType<typeof useOrder<keyof Role>>;

/** @returns {@link useOrder} specialized for a {@link Role}. */
export function useRoleOrder(): RoleOrder {
	return useOrder<keyof Role>('name');
}

/** @returns a table which displays {@link Role}s in a customizable manner. */
export function RoleTable(props: BaseProps<Role, 'id'>): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.Role,
		e => `role ${e.id} "${e.name}"`,
		getId,
		props => <RoleForm  {...props} id='edit-role-form' />,
	);

	return <>
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(r => (
				<Tr
					key={r.id}
					onClick={props.onRowSelect && (() => props.onRowSelect!(r))}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: r }) : undefined}
					onEdit={() => setRowEvent({ action: 'edit', data: r })}
					selected={r.id === props.selectedRow}
				>
					<Td>{r.id}</Td>
					<Td>{r.name}</Td>
					<Td>{r.password_ttl}</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
