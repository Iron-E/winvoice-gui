import { isExpense, Expense, Currency } from '@/schema';
import { testNarrowing } from './utils';

const EXPENSE: Readonly<Expense> = {
	category: 'abd',
	cost: { amount: '50.00', currency: Currency.Eur },
	description: 'asldkj',
	id: 'id',
	timesheet_id: 'asldkj',
};

describe('isExpense', () => {
	const [fields] = testNarrowing(isExpense);

	fields(EXPENSE, [
		['category', 4],
		['cost', 'abc'],
		['description', 4],
		['id', 4],
		['timesheet_id', 4],
	]);
});
