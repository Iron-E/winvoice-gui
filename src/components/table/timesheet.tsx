'use client';

import React from 'react';
import type { BaseProps, OrderProps } from './props';
import type {
	Department,
	Invoice,
	InvoiceDate,
	Timesheet,
	Location,
	Organization,
	Employee,
	Expense,
	Job,
} from '@/schema'
import { EmployeeTable } from './employee';
import { ExpenseTable } from './expense';
import { getId } from '@/utils';
import { JobTable } from './job';
import { OrderedData } from './order';
import { Route } from '@/api';
import { Table } from '../table';
import { Td } from './column';
import { TimesheetForm } from '../form';
import { Tr, useRowEventHandlers } from './row';
import { useApiContext } from '../api';

export * from './timesheet/valuators';

/** the headers of the {@link TimesheetTable}. */
const HEADERS = ['Id', 'Time Begin', 'Time End', 'Work Notes', 'Employee', 'Expenses', 'Job'] as const;

/** @returns a table which displays {@link Timesheet}s in a customizable manner. */
export function TimesheetTable(props:
	& BaseProps<Timesheet, 'id'>
	& OrderProps<'employee', Employee>
	& OrderProps<'employeeDepartment' | 'jobDepartments', Department>
	& OrderProps<'expenses', Expense>
	& OrderProps<'job', Job>
	& OrderProps<'jobClient', Organization>
	& OrderProps<'jobClientLocation' | 'jobClientOuterLocation', Location>
	& OrderProps<'jobInvoice', Invoice>
	& OrderProps<'jobInvoiceDate', InvoiceDate>
): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.Timesheet,
		e => `timesheet ${e.id}`,
		getId,
		props => <TimesheetForm  {...props} id='edit-timesheet-form' />,
	);

	return <>
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(t => (
				<Tr
					key={t.id}
					onClick={props.onRowSelect && (() => props.onRowSelect!(t))}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: t }) : undefined}
					onEdit={() => setRowEvent({ action: 'edit', data: t })}
					selected={t.id === props.selectedRow}
				>
					<Td>{t.id}</Td>
					<Td>{t.time_begin.toLocaleString()}</Td>
					<Td>{t.time_end?.toLocaleString()}</Td>
					<Td>{t.work_notes}</Td>
					<Td>
						<EmployeeTable
							deletable={false}
							departmentOrder={props.employeeDepartmentOrder}
							onReorderDepartment={props.onReorderEmployeeDepartment}
							orderedData={new OrderedData(
								props.employeeOrder,
								props.onReorderEmployee,
								[t.employee],
								d => props.orderedData.swap(getId, t.id, { ...t, employee: d[0]! }),
							)}
						/>
					</Td>
					<Td>
						{t.expenses.length > 0 && (
							<ExpenseTable
								orderedData={new OrderedData(
									props.expensesOrder,
									props.onReorderExpenses,
									t.expenses,
									d => props.orderedData.swap(getId, t.id, { ...t, expenses: d as Expense[] }),
								)}
							/>
						)}
					</Td>
					<Td>
						<JobTable
							deletable={false}
							clientLocationOrder={props.jobClientLocationOrder}
							clientOrder={props.jobClientOrder}
							clientOuterLocationOrder={props.jobClientOuterLocationOrder}
							departmentsOrder={props.jobDepartmentsOrder}
							invoiceDateOrder={props.jobInvoiceDateOrder}
							invoiceOrder={props.jobInvoiceOrder}
							onReorderClient={props.onReorderJobClient}
							onReorderClientLocation={props.onReorderJobClientLocation}
							onReorderClientOuterLocation={props.onReorderJobClientOuterLocation}
							onReorderDepartments={props.onReorderJobDepartments}
							onReorderInvoice={props.onReorderJobInvoice}
							onReorderInvoiceDate={props.onReorderJobInvoiceDate}
							orderedData={new OrderedData(
								props.jobOrder,
								props.onReorderJob,
								[t.job],
								d => props.orderedData.swap(getId, t.id, { ...t, job: d[0]! }),
							)}
						/>
					</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
