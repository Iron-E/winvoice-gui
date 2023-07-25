import { type Employee } from "./employee";
import { type Expense } from "./expense";
import { type Id } from "./id";
import { type Job } from "./job";

/**
 * Same as {@link https://github.com/Iron-E/winvoice-schema | `Timesheet`} type.
 */
export type Timesheet = {
	employee: Employee,
	expenses: Expense[],
	id: Id,
	job: Job,
	time_begin: Date,
	time_end?: Date,
	work_notes: string,
};
