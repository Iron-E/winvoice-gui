import { Id } from "./id";
import { Money } from "./money";

/**
 * Same as {@link https://github.com/Iron-E/winvoice-schema | `Expense`} type.
 */
export type Expense = {
	category: string,
	cost: Money,
	description: string,
	id: Id,
	timesheet_id: Id,
};
