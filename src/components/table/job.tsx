'use client';

import React from 'react';
import type { BaseProps, OrderProps } from './props';
import type { Department, Invoice, InvoiceDate, Job, Location, Organization } from '@/schema'
import {
	DepartmentTable,
	OrderedData,
	organizationValuators,
	Table,
	Td,
	Tr,
	type UseOrder,
	type Valuators,
	useOrder,
	useRowEventHandlers,
} from '../table';
import { JobForm } from '../form';
import { Route } from '@/api';
import { useApiContext } from '../api';
import { ValueOf, getId } from '@/utils';

/** the headers of the {@link JobTable}. */
const HEADERS = ['ID', 'Active', 'Name', 'Title', 'Department'] as const;

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Job}
 */
export function jobValuators(
	clientKey: keyof Organization,
	clientLocationKey: keyof Location,
	clientOuterLocationKey: keyof ValueOf<Location, 'outer'>,
	departmentKey: keyof Department,
	invoiceKey: keyof Invoice,
	invoiceDateKey: keyof ValueOf<Invoice, 'date'>,
	invoiceHourlyRateKey: keyof ValueOf<Invoice, 'hourly_rate'>,
): Valuators<Job> {
	return {
		client: { key: clientKey, valuators: organizationValuators(clientLocationKey, clientOuterLocationKey) },
		departments: { key: departmentKey },
		invoice: {
			key: invoiceKey,
			valuators: {
				date: { key: invoiceDateKey },
				hourly_rate: { key: invoiceHourlyRateKey },
			},
		},
	};
}

/** @returns {@link useOrder} specialized for a {@link Job}. */
export function useJobOrder(): UseOrder<Job> {
	return useOrder('date_close');
}

/** @returns a table which displays {@link Job}s in a customizable manner. */
export function JobTable(props:
	& BaseProps<Job, 'id'>
	& OrderProps<'client', Organization>
	& OrderProps<'department', Department>
	& OrderProps<'invoice', Invoice>
	& OrderProps<'invoiceDate', InvoiceDate>
	& OrderProps<'invoiceHourlyRate', ValueOf<Invoice, 'hourly_rate'>>
): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.Job,
		e => `job ${e.id}`,
		getId,
		props => <JobForm  {...props} id='edit-job-form' />,
	);

	return <>
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(e => (
				<Tr
					key={e.id}
					onClick={props.onRowSelect && (() => props.onRowSelect!(e))}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: e }) : undefined}
					onEdit={() => setRowEvent({ action: 'edit', data: e })}
					selected={e.id === props.selectedRow}
				>
					<Td>{e.id}</Td>
					<Td>{e.active ? 'Yes' : 'No'}</Td>
					<Td>{e.name}</Td>
					<Td>{e.title}</Td>
					<Td>
						<DepartmentTable
							deletable={false}
							orderedData={new OrderedData(
								props.departmentOrder,
								props.onReorderDepartment,
								[e.department],
								d => props.orderedData.swap(getId, e.id, { ...e, department: d[0]! }),
							)}
						/>
					</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
