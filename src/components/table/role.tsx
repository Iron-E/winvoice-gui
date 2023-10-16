'use client';

import React from 'react';
import type { BaseProps } from './props';
import type { Role } from '@/schema'
import { getId } from '@/utils';
import { RoleForm } from '../form';
import { Route } from '@/api';
import { Table } from '../table';
import { Td } from './column';
import { Tr, useRowEventHandlers } from './row';
import { useApiContext } from '../api';

export * from './role/valuators';

/** the headers of the {@link RoleTable}. */
const HEADERS = ['ID', 'Name', 'Password TTL'] as const;

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
