import { Currency, Money, isMoney } from '@/schema';
import { testNarrowing } from './utils';

const MONEY: Readonly<Money> = { amount: '50.00', currency: Currency.Usd };

describe('isMoney', () => {
	const [fields] = testNarrowing(isMoney);

	fields(MONEY, [
		['amount', 4],
		['currency', 'asldkj'],
	]);
});
