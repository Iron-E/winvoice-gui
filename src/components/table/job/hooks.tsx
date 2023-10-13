import type { Job } from "@/schema";
import { JobTable } from "../job";
import { jobValuators } from './valuators';
import { type UseOrder, type UseTable, useOrder, useOrderedData } from "../order";
import { useDepartmentOrder } from "../department/hooks";
import { useInvoiceDateOrder, useInvoiceOrder } from "../invoice/hooks";
import { useLocationOrder } from "../location/hooks";
import { useOrganizationOrder } from "../organization/hooks";

const COLUMN = 'date_close' as const;

/** @returns {@link useOrder} specialized for a {@link Job}. */
export function useJobOrder(): UseOrder<Job> {
	return useOrder(COLUMN);
}

export function useJobTable(): UseTable<Job> {
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

	const [ORDERED_DATA, swapKey] = useOrderedData<Job, typeof KEYS>(COLUMN, jobValuators, KEYS);
	return [ORDERED_DATA, ORDERED_DATA.data.length < 1 ? undefined : (
		<JobTable
			clientLocationOrder={CLIENT_LOCATION_ORDER}
			clientOrder={CLIENT_ORDER}
			clientOuterLocationOrder={CLIENT_OUTER_LOCATION_ORDER}
			departmentsOrder={DEPARTMENTS_ORDER}
			invoiceDateOrder={INVOICE_DATE_ORDER}
			invoiceOrder={INVOICE_ORDER}
			onReorderClient={ORDERED_DATA.refreshOnReorder(setClientOrder, swapKey('client'))}
			onReorderClientLocation={ORDERED_DATA.refreshOnReorder(setClientLocationOrder, swapKey('clientLocation'))}
			onReorderClientOuterLocation={ORDERED_DATA.refreshOnReorder(setClientOuterLocationOrder, swapKey('clientOuterLocation'))}
			onReorderDepartments={ORDERED_DATA.refreshOnReorder(setDepartmentsOrder, swapKey('departments'))}
			onReorderInvoice={ORDERED_DATA.refreshOnReorder(setInvoiceOrder, swapKey('invoice'))}
			onReorderInvoiceDate={ORDERED_DATA.refreshOnReorder(setInvoiceDateOrder, swapKey('invoiceDate'))}
			orderedData={ORDERED_DATA}
		/>
	)];
}
