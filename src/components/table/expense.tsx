'use client';

import React from 'react';
import type { BaseProps } from './props';
import { ExpenseForm } from '../form';
import { getId } from '@/utils';
import { moneyToString, type Expense } from '@/schema'
import { Route } from '@/api';
import { Table } from '../table';
import { Td } from './column';
import { Tr, useRowEventHandlers } from './row';
import { useApiContext } from '../api';

export * from './expense/hooks';
export * from './expense/valuators';

/** the headers of the {@link ExpenseTable}. */
const HEADERS = ['Timesheet ID', 'ID', 'Category', 'Cost', 'Description'] as const;

/** @returns a table which displays {@link Expense}s in a customizable manner. */
export function ExpenseTable(props: Omit<BaseProps<Expense, 'id'>, 'deletable'>): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.Expense,
		e => `expense ${e.id}`,
		getId,
		props => <ExpenseForm  {...props} id='edit-expense-form' />,
	);

	return <>
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(x => (
				<Tr
					key={x.id}
					onClick={props.onRowSelect && (() => props.onRowSelect!(x))}
					onDelete={() => setRowEvent({ action: 'delete', data: x })}
					onEdit={() => setRowEvent({ action: 'edit', data: x })}
					selected={x.id === props.selectedRow}
				>
					<Td>{x.timesheet_id}</Td>
					<Td>{x.id}</Td>
					<Td>{x.category}</Td>
					<Td>{moneyToString(x.cost)}</Td>
					<Td>{x.description}</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
