import { isId } from '@/schema';
import { testNarrowing } from './utils';

describe('isId', () => {
	const [_, t, __] = testNarrowing(isId);

	t('Valid', 'c04d258f-b0f4-487a-9cf8-2504385b382d')
});
