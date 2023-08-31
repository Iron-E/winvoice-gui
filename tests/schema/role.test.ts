import { isRole, Role } from '@/schema';
import { testNarrowing } from './utils';

const ROLE: Readonly<Role> = {
	id: 'asldkj',
	name: 'alskdj',
	password_ttl: 'asldkj',
};

describe('isRole', () => {
	const [fields] = testNarrowing(isRole);

	fields(ROLE, [
		['id', 3],
		['name', 3],
		['password_ttl', 3, true],
	]);
});
