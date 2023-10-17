import { fieldMaybeIs } from '@/utils';
import { isEmployee, type Employee } from './employee';
import type { Expense } from './expense';
import { isId, type Id } from './id';
import { isJob, type Job } from './job';

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Timesheet`} type. */
export type Timesheet = {
	employee: Employee,
	expenses: Expense[],
	id: Id,
	job: Job,
	time_begin: Date,
	time_end?: Date,
	work_notes: string,
};

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link Timesheet}.
 */
export function isTimesheet(json: unknown): json is Timesheet {
	return json instanceof Object && (
		'employee' in json && isEmployee(json.employee)
		&& 'expenses' in json && json.expenses instanceof Array
		&& 'id' in json && isId(json.id)
		&& 'job' in json && isJob(json.job)
		&& 'time_begin' in json && json.time_begin instanceof Date
		&& fieldMaybeIs(json, 'time_end', d => d instanceof Date)
		&& 'work_notes' in json && typeof json.work_notes === 'string'
	);
}
