'use client';

import React from 'react';
import type { Job } from '@/schema';
import {
	JobForm,
	JobTable,
	jobValuators,
	useDepartmentOrder,
	useInvoiceDateOrder,
	useInvoiceOrder,
	useLocationOrder,
	useOrderedData,
	useOrganizationOrder,
} from '@/components';

export default function Page(): React.ReactElement {
	const [CLIENT_ORDER, setClientOrder] = useOrganizationOrder();
	const [CLIENT_LOCATION_ORDER, setClientLocationOrder] = useLocationOrder();
	const [CLIENT_OUTER_LOCATION_ORDER, setClientOuterLocationOrder] = useLocationOrder();
	const [DEPARTMENTS_ORDER, setDepartmentsOrder] = useDepartmentOrder();
	const [INVOICE_ORDER, setInvoiceOrder] = useInvoiceOrder();
	const [INVOICE_DATE_ORDER, setInvoiceDateOrder] = useInvoiceDateOrder();

	const KEYS = {
		client: CLIENT_ORDER.column,
		clientLocation: CLIENT_LOCATION_ORDER.column,
		clientOuterLocation: CLIENT_OUTER_LOCATION_ORDER.column,
		departments: DEPARTMENTS_ORDER.column,
		invoice: INVOICE_ORDER.column,
		invoiceDate: INVOICE_DATE_ORDER.column,
	} as const;

	const [ORDERED_DATA, swapKey] = useOrderedData<Job, typeof KEYS>('date_open', jobValuators, KEYS);
	return <>
		<JobForm
			id='new-job-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={j => ORDERED_DATA.append(j)}
		/>

		{ORDERED_DATA.data.length > 0 && (
			<JobTable
				clientLocationOrder={CLIENT_LOCATION_ORDER}
				clientOrder={CLIENT_ORDER}
				clientOuterLocationOrder={CLIENT_OUTER_LOCATION_ORDER}
				departmentsOrder={DEPARTMENTS_ORDER}
				invoiceDateOrder={INVOICE_DATE_ORDER}
				invoiceOrder={INVOICE_ORDER}
				onReorderClient={ORDERED_DATA.refreshOnReorder(setClientOrder, swapKey('client'))}
				onReorderClientLocation={ORDERED_DATA.refreshOnReorder(setClientLocationOrder, swapKey('clientLocation'))}
				onReorderClientOuterLocation={
					ORDERED_DATA.refreshOnReorder(setClientOuterLocationOrder, swapKey('clientOuterLocation'))
				}
				onReorderDepartments={ORDERED_DATA.refreshOnReorder(setDepartmentsOrder, swapKey('departments'))}
				onReorderInvoice={ORDERED_DATA.refreshOnReorder(setInvoiceOrder, swapKey('invoice'))}
				onReorderInvoiceDate={ORDERED_DATA.refreshOnReorder(setInvoiceDateOrder, swapKey('invoiceDate'))}
				orderedData={ORDERED_DATA}
			/>
		)}
	</>;
}
