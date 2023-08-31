import { Currency, Location, isLocation } from '@/schema';
import { testNarrowing } from './utils';

const LOCATION: Readonly<Location> = {
	currency: Currency.Aud,
	id: 'asldkj',
	name: 'asldkjsldkjf',
	outer: {
		currency: Currency.Usd,
		id: 'asdlkjalsdkj',
		name: 'fhgkjrhiguhihu',
	},
};

describe('isLocation', () => {
	const [fields] = testNarrowing(isLocation);

	fields(LOCATION, [
		['currency', 3, true],
		['id', 3],
		['name', 3],
		['outer', 3, true],
	]);
});
