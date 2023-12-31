import type {
	Department,
	Employee,
	Expense,
	Invoice,
	InvoiceDate,
	Job,
	Location,
	Organization,
	Timesheet,
} from "@/schema";
import type { Valuators } from "../order";
import { employeeValuators, jobValuators } from "../../table";
import { EXPENSE_VALUATORS } from "../expense/valuators";

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Timesheet}
 */
export function timesheetValuators(keys: {
	employee: keyof Employee;
	employeeDepartment: keyof Department;
	expenses: keyof Expense;
	job: keyof Job,
	jobClient: keyof Organization,
	jobClientLocation: keyof Location,
	jobClientOuterLocation: keyof Location,
	jobDepartments: keyof Department,
	jobInvoice: keyof Invoice,
	jobInvoiceDate: keyof InvoiceDate,
}): Valuators<Timesheet> {
	return {
		employee: { key: keys.employee, valuators: employeeValuators(keys.employeeDepartment) },
		expenses: { key: keys.expenses, valuators: EXPENSE_VALUATORS },
		job: {
			key: keys.job,
			valuators: jobValuators({
				client: keys.jobClient,
				clientLocation: keys.jobClientLocation,
				clientOuterLocation: keys.jobClientOuterLocation,
				departments: keys.jobDepartments,
				invoice: keys.jobInvoice,
				invoiceDate: keys.jobInvoiceDate,
			})
		},
	};
}
