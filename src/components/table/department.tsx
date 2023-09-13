'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Client } from '../api';
import { DepartmentForm } from '../form';
import { Id, type Department } from '@/schema'
import { Route } from '@/api';
import { SHOW_MESSAGE_CONTEXT } from '../messages';
import { Table, Td, Tr, useOrder, useRowEventHandlers } from '../table';

/** the headers of the {@link DepartmentTable}. */
const HEADERS = ['Name', 'ID'] as const;

/** @returns {@link useOrder} specialized for a {@link Department}. */
export function useDepartmentOrder(): ReturnType<typeof useOrder<keyof Department>> {
	return useOrder<keyof Department>('name');
}

/** @returns a {@link Table} that displays a {@link Department} and its outer department. */
export function DepartmentTable(props: BaseProps<Department, Id>): React.ReactElement {
	const CLIENT = React.useContext(Client.CONTEXT);
	const showMessage = React.useContext(SHOW_MESSAGE_CONTEXT);
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.Department,
		d => `department ${d.id} "${d.name}"`,
		d => d.id,
		(props) => <DepartmentForm  {...props} id='edit-department-form' />,
	);

	return <>
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(d => (
				<Tr
					selected={d.id === props.selectedRow}
					key={d.id}
					onClick={props.onRowSelect && (() => props.onRowSelect!(d))}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: d }) : undefined}
					// ?
					onEdit={() => setRowEvent({ action: 'edit', data: d })}
				>
					<Td>{d.name}</Td>
					<Td>{d.id}</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
