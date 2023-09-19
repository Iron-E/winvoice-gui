'use client';

import React from 'react';
import type { BaseProps } from './props';
import type { Department } from '@/schema'
import { DepartmentForm } from '../form';
import { Route } from '@/api';
import { Table, Td, Tr, useOrder, useRowEventHandlers } from '../table';
import { getId } from '@/utils';
import { useApiContext } from '../api';

/** the headers of the {@link DepartmentTable}. */
const HEADERS = ['ID', 'Name'] as const;

/** The {@link Order} of {@link Location}s. */
export type DepartmentOrder = ReturnType<typeof useOrder<keyof Department>>;

/** @returns {@link useOrder} specialized for a {@link Department}. */
export function useDepartmentOrder(): DepartmentOrder {
	return useOrder<keyof Department>('name');
}

/** @returns a {@link Table} that displays a {@link Department} and its outer department. */
export function DepartmentTable(props: BaseProps<Department, 'id'>): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.Department,
		d => `department ${d.id} "${d.name}"`,
		getId,
		props => <DepartmentForm  {...props} id='edit-department-form' />,
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
					<Td>{d.id}</Td>
					<Td>{d.name}</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
