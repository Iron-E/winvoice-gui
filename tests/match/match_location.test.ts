import { type MatchLocation as M } from '../../src/match';
import { Currency } from '../../src/schema';

describe('testing Match', () => {
	test('JSON decoding', () => {
		expect(JSON.parse(`{
			"id": "any",
			"outer": {"some": {
				"currency": {"some": "USD"},
				"name": "Europe"
			}},
			"name": "Sweden"
		}`)).toStrictEqual<M>({
			id: "any",
			outer: {
				some: {
					currency: { some: Currency.Usd },
					name: "Europe"
				}
			},
			name: "Sweden"
		});
	})
});
