import { isUser, User } from '@/schema';
import { testNarrowing } from './utils';

const USER: Readonly<User> = {
	employee: {
		active: true,
		department: { id: 'asldkj', name: 'aslkdj' },
		id: 'asldkj',
		name: 'asldkj',
		title: 'aslkdj',
	},
	id: 'asldkj',
	password: 'asldkj',
	password_expires: new Date(),
	role: { id: 'asldkj', name: 'asdlkj' },
	username: 'alskdj',
};

describe('isUser', () => {
	const [fields] = testNarrowing(isUser);

	fields(USER, [
		['employee', 3, true],
		['id', 3],
		['password', 3],
		['password_expires', 3, true],
		['role', 3],
		['username', 3],
	]);
});
