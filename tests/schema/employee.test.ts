import { isEmployee, Employee } from '@/schema';
import { testNarrowing } from './utils';

const EMPLOYEE: Readonly<Employee> = {
	active: false,
	department: { id: 'id', name: 'foo' },
	id: 'id',
	name: 'Canada',
	title: 'testing',
};

describe('isEmployee', () => {
	const [fields] = testNarrowing(isEmployee);

	fields(EMPLOYEE, [
		['active', 'a'],
		['department', 'abc'],
		['id', 3],
		['name', 3],
		['title', 3],
	]);
});
