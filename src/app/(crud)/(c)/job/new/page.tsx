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
	const ORDERED_DATA = useOrderedData<Job>('date_open', jobValuators(
		CLIENT_ORDER.column,
		CLIENT_LOCATION_ORDER.column,
		CLIENT_OUTER_LOCATION_ORDER.column,
		DEPARTMENTS_ORDER.column,
		INVOICE_ORDER.column,
		INVOICE_DATE_ORDER.column,

	));

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
				onReorderClient={setClientOrder}
				onReorderClientLocation={setClientLocationOrder}
				onReorderClientOuterLocation={setClientOuterLocationOrder}
				onReorderDepartments={setDepartmentsOrder}
				onReorderInvoice={setInvoiceOrder}
				onReorderInvoiceDate={setInvoiceDateOrder}
				orderedData={ORDERED_DATA}
			/>
		)}
	</>;
}
