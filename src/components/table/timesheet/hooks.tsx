import type { Timesheet } from "@/schema";
import { TimesheetTable } from "../timesheet";
import { timesheetValuators } from './valuators';
import { type UseOrder, type UseTable, useOrder, useOrderedData } from "../order";
import { useDepartmentOrder } from "../department/hooks";
import { useEmployeeOrder } from "../employee/hooks";
import { useExpenseOrder } from "../expense/hooks";
import { useInvoiceDateOrder, useInvoiceOrder } from "../invoice/hooks";
import { useJobOrder } from "../job/hooks";
import { useLocationOrder } from "../location/hooks";
import { useOrganizationOrder } from "../organization/hooks";

const COLUMN = 'time_begin' as const;

/** @returns {@link useOrder} specialized for a {@link Timesheet}. */
export function useTimesheetOrder(): UseOrder<Timesheet> {
	return useOrder(COLUMN);
}

/** @returns {@link useOrder} specialized for a {@link Timesheet}. */
export function useTimesheetTable(): UseTable<Timesheet> {
	const [EMPLOYEE_ORDER, setEmployeeOrder] = useEmployeeOrder();
	const [EMPLOYEE_DEPARTMENT_ORDER, setEmployeeDepartmentOrder] = useDepartmentOrder();
	const [EXPENSES_ORDER, setExpensesOrder] = useExpenseOrder();
	const [JOB_ORDER, setJobOrder] = useJobOrder();
	const [JOB_CLIENT_ORDER, setJobClientOrder] = useOrganizationOrder();
	const [JOB_CLIENT_LOCATION_ORDER, setJobClientLocationOrder] = useLocationOrder();
	const [JOB_CLIENT_OUTER_LOCATION_ORDER, setJobClientOuterLocationOrder] = useLocationOrder();
	const [JOB_DEPARTMENTS_ORDER, setJobDepartmentsOrder] = useDepartmentOrder();
	const [JOB_INVOICE_ORDER, setJobInvoiceOrder] = useInvoiceOrder();
	const [JOB_INVOICE_DATE_ORDER, setJobInvoiceDateOrder] = useInvoiceDateOrder();

	const KEYS = {
		employee: EMPLOYEE_ORDER.column,
		employeeDepartment: EMPLOYEE_DEPARTMENT_ORDER.column,
		expenses: EXPENSES_ORDER.column,
		job: JOB_ORDER.column,
		jobClient: JOB_CLIENT_ORDER.column,
		jobClientLocation: JOB_CLIENT_LOCATION_ORDER.column,
		jobClientOuterLocation: JOB_CLIENT_OUTER_LOCATION_ORDER.column,
		jobDepartments: JOB_DEPARTMENTS_ORDER.column,
		jobInvoice: JOB_INVOICE_ORDER.column,
		jobInvoiceDate: JOB_INVOICE_DATE_ORDER.column,
	} as const;

	const [ORDERED_DATA, swapKey] = useOrderedData<Timesheet, typeof KEYS>(COLUMN, timesheetValuators, KEYS);
	return [ORDERED_DATA, ORDERED_DATA.data.length < 1 ? undefined : (
		<TimesheetTable
			employeeDepartmentOrder={EMPLOYEE_DEPARTMENT_ORDER}
			employeeOrder={EMPLOYEE_ORDER}
			expensesOrder={EXPENSES_ORDER}
			jobOrder={JOB_ORDER}
			jobClientLocationOrder={JOB_CLIENT_LOCATION_ORDER}
			jobClientOrder={JOB_CLIENT_ORDER}
			jobClientOuterLocationOrder={JOB_CLIENT_OUTER_LOCATION_ORDER}
			jobDepartmentsOrder={JOB_DEPARTMENTS_ORDER}
			jobInvoiceDateOrder={JOB_INVOICE_DATE_ORDER}
			jobInvoiceOrder={JOB_INVOICE_ORDER}
			onReorderEmployee={ORDERED_DATA.refreshOnReorder(setEmployeeOrder, swapKey('employee'))}
			onReorderEmployeeDepartment={
				ORDERED_DATA.refreshOnReorder(setEmployeeDepartmentOrder, swapKey('employeeDepartment'))
			}
			onReorderExpenses={ORDERED_DATA.refreshOnReorder(setExpensesOrder, swapKey('expenses'))}
			onReorderJob={ORDERED_DATA.refreshOnReorder(setJobOrder, swapKey('job'))}
			onReorderJobClient={ORDERED_DATA.refreshOnReorder(setJobClientOrder, swapKey('jobClient'))}
			onReorderJobClientLocation={
				ORDERED_DATA.refreshOnReorder(setJobClientLocationOrder, swapKey('jobClientLocation'))
			}
			onReorderJobClientOuterLocation={
				ORDERED_DATA.refreshOnReorder(setJobClientOuterLocationOrder, swapKey('jobClientOuterLocation'))
			}
			onReorderJobDepartments={ORDERED_DATA.refreshOnReorder(setJobDepartmentsOrder, swapKey('jobDepartments'))}
			onReorderJobInvoice={ORDERED_DATA.refreshOnReorder(setJobInvoiceOrder, swapKey('jobInvoice'))}
			onReorderJobInvoiceDate={ORDERED_DATA.refreshOnReorder(setJobInvoiceDateOrder, swapKey('jobInvoiceDate'))}
			orderedData={ORDERED_DATA}
		/>
	)];
}
