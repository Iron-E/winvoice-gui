import { Organization, isOrganization } from '@/schema';
import { testNarrowing } from './utils';

const ORG: Readonly<Organization> = {
	id: 'asldkj',
	location: { id: 'aslkdjalsdkj', name: 'aslkdjaldskj' },
	name: 'asldkj',
};

describe('isOrganization', () => {
	const [fields] = testNarrowing(isOrganization);

	fields(ORG, [
		['id', 4],
		['location', 4],
		['name', 4],
	]);
});
