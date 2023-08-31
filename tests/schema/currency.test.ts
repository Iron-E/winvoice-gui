import { isCurrency } from '@/schema';
import { testNarrowing } from './utils';

describe('isCurrency', () => {
	const [_, t, __] = testNarrowing(isCurrency);

	t('Valid', 'USD')
});
