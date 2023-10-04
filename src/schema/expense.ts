import { isId, type Id } from './id';
import { type Money, isMoney } from './money';

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Expense`} type. */
export type Expense = {
	category: string,
	cost: Money,
	description: string,
	id: Id,
	timesheet_id: Id,
};

/** The type accepted by the API when creating expenses. */
export type ExpenseValue = [
	Expense['category'],
	Expense['cost'],
	Expense['description'],
];

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link Expense}.
 */
export function isExpense(json: unknown): json is Expense {
	return json instanceof Object && (
		'category' in json && typeof json.category === 'string'
		&& 'cost' in json && isMoney(json.cost)
		&& 'description' in json && typeof json.description === 'string'
		&& 'id' in json && isId(json.id)
		&& 'timesheet_id' in json && isId(json.timesheet_id)
	);
}
