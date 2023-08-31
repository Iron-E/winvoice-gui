import { Currency, Job, isJob } from '@/schema';
import { testNarrowing } from './utils';

const LOCATION: Readonly<Job> = {
	client: {
		id: 'asldkj',
		location: { id: 'aslkdj', name: 'asldkj' },
		name: 'asldkja',
	},
	date_close: new Date(),
	date_open: new Date(),
	departments: [],
	id: 'asdlkj',
	increment: 'asldkj',
	invoice: {
		date: { issued: new Date() },
		hourly_rate: { amount: 'asldkj', currency: Currency.Eur },
	},
	notes: 'asldkjalsdkj',
	objectives: 'asldkalsdkj',
};

describe('isJob', () => {
	const [fields] = testNarrowing(isJob);

	fields(LOCATION, [
		['client', 4],
		['date_close', 4, true],
		['date_open', 4],
		['departments', 4],
		['id', 4],
		['increment', 4],
		['invoice', 4],
		['notes', 4],
		['objectives', 4],
	]);
});
