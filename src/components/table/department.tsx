'use client';

import React from 'react';
import type { BaseProps } from './props';
import type { Department } from '@/schema'
import { DepartmentForm } from '../form';
import { getId } from '@/utils';
import { Route } from '@/api';
import { Table } from '../table';
import { Td } from './column';
import { Tr, useRowEventHandlers } from './row';
import { useApiContext } from '../api';

export * from './department/hooks';

/** the headers of the {@link DepartmentTable}. */
const HEADERS = ['ID', 'Name'] as const;

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
					key={d.id}
					onClick={props.onRowSelect && (() => props.onRowSelect!(d))}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: d }) : undefined}
					onEdit={() => setRowEvent({ action: 'edit', data: d })}
					selected={d.id === props.selectedRow}
				>
					<Td>{d.id}</Td>
					<Td>{d.name}</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
