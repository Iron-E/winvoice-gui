import { isContact, isContactKind, Location } from '@/schema';
import { testNarrowing } from './utils';

const LOCATION: Readonly<Location> = { id: 'id', name: 'Canada' };

describe('isContactKind', () => {
	const [_, t, f] = testNarrowing(isContactKind);

	t('Address', { address: LOCATION });
	f('Address (invalid)', { address: 'abcd' });

	t('Email', { email: 'foo@bar.io' });
	f('Email (invalid)', { email: 4 });

	t('Other', { other: '@username' });
	f('Other (invalid)', { other: 4 });

	t('Phone', { phone: '1-800-555-5555' });
	f('Phone (invalid)', { phone: 4 });
});

describe('isContact', () => {
	const [_, t, f] = testNarrowing(isContact);

	t('Address', { address: LOCATION, label: 'c' });
	t('Email', { email: 'email', label: 'c' });
	t('Other', { other: 'other', label: 'c' });
	t('Phone', { phone: 'phone', label: 'c' });

	f('w/ invalid label', { email: 3 });
	f('w/ invalid kind', { label: 44 });

	f('w/o label', { email: 'c' });
	f('w/o kind', { label: 'c' });
});
