'use client';

import React from 'react';
import type { BaseProps, OrderProps } from './props';
import type { Department, Invoice, InvoiceDate, Job, Location, Organization } from '@/schema'
import { DepartmentTable } from './department';
import { getId } from '@/utils';
import { InvoiceTable } from './invoice';
import { JobForm } from '../form';
import { OrderedData } from './order';
import { OrganizationTable } from './organization';
import { Route } from '@/api';
import { Table } from '../table';
import { Td } from './column';
import { RowEventHandlerEditForm, Tr, useRowEventHandlers } from './row';
import { useApiContext } from '../api';

export * from './job/valuators';

const FORM: RowEventHandlerEditForm<Job> = props => <JobForm  {...props} id='edit-job-form' />;
const HEADERS = [
	'Id',
	'Date Open',
	'Date Close',
	'Increment',
	'Notes',
	'Objectives',
	'Client',
	'Invoice',
	'Departments',
] as const;

/** @returns a table which displays {@link Job}s in a customizable manner. */
export function JobTable(props:
	& BaseProps<Job, 'id'>
	& OrderProps<'client', Organization>
	& OrderProps<'clientLocation' | 'clientOuterLocation', Location>
	& OrderProps<'departments', Department>
	& OrderProps<'invoice', Invoice>
	& OrderProps<'invoiceDate', InvoiceDate>
): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.Job,
		e => `job ${e.id}`,
		getId,
		FORM,
	);

	return <>
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(j => (
				<Tr
					key={j.id}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: j }) : undefined}
					onEdit={() => setRowEvent({ action: 'edit', data: j })}
					onSelect={props.onRowSelect && (() => props.onRowSelect!(j))}
				>
					<Td>{j.id}</Td>
					<Td>{j.date_open.toLocaleString()}</Td>
					<Td>{j.date_close?.toLocaleString()}</Td>
					<Td>{j.increment}</Td>
					<Td>{j.notes}</Td>
					<Td>{j.objectives}</Td>
					<Td>
						<OrganizationTable
							deletable={false}
							locationOrder={props.clientLocationOrder}
							onReorderLocation={props.onReorderClientLocation}
							onReorderOuterLocation={props.onReorderClientOuterLocation}
							orderedData={new OrderedData(
								props.clientOrder,
								props.onReorderClient,
								[j.client],
								d => props.orderedData.swap(getId, j.id, { ...j, client: d[0]! }),
							)}
							outerLocationOrder={props.clientOuterLocationOrder}
						/>
					</Td>
					<Td>
						<InvoiceTable
							dateOrder={props.invoiceDateOrder}
							onReorderDate={props.onReorderInvoiceDate}
							orderedData={new OrderedData(
								props.invoiceOrder,
								props.onReorderInvoice,
								[j.invoice],
								d => props.orderedData.swap(getId, j.id, { ...j, invoice: d[0]! }),
							)}
						/>
					</Td>
					<Td>
						<DepartmentTable
							deletable={j.departments.length > 1}
							orderedData={new OrderedData(
								props.departmentsOrder,
								props.onReorderDepartments,
								j.departments,
								d => props.orderedData.swap(getId, j.id, { ...j, departments: d as Department[] }),
							)}
						/>
					</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
