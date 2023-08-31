import { Currency, isTimesheet, Timesheet } from '@/schema';
import { testNarrowing } from './utils';

const TIMESHEET: Readonly<Timesheet> = {
	employee: {
		active: true,
		department: { id: 'asldkj', name: 'aslkdj' },
		id: 'asldkj',
		name: 'asldkj',
		title: 'aslkdj',
	},
	expenses: [],
	id: 'asldkj',
	job: {
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

	},
	time_begin: new Date(),
	time_end: new Date(),
	work_notes: '',
};

describe('isTimesheet', () => {
	const [fields] = testNarrowing(isTimesheet);

	fields(TIMESHEET, [
		['employee', 4],
		['expenses', 4],
		['id', 4],
		['job', 4],
		['time_begin', 4],
		['time_end', Date, true],
		['work_notes', 4],
	]);
});
