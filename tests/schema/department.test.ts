import { isDepartment, Department } from '@/schema';
import { testNarrowing } from './utils';

const DEPARTMENT: Readonly<Department> = { id: 'id', name: 'Canada' };

describe('isDepartment', () => {
	const [fields] = testNarrowing(isDepartment);

	fields(DEPARTMENT, [
		['id', 3],
		['name', 3],
	]);
});
