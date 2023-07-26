import { type MatchExpense as M } from '../../src/match';
import { Currency } from '../../src/schema';

describe('testing MatchExpense', () => {
	test('JSON decoding', () => {
		expect(JSON.parse(`{
			"category": {"regex": "^s*([Ff]ood|[Tt]ravel)s*$"},
			"cost": {"greater_than": {"amount": "50.00", "currency": "USD"}},
			"description": {"contains": "need"},
			"id": "any",
			"timesheet_id": "e1d0b735-2b36-43e9-8d04-967573eed612"
		}`)).toStrictEqual<M>({
			category: { regex: "^s*([Ff]ood|[Tt]ravel)s*$" },
			cost: { greater_than: { amount: "50.00", currency: Currency.Usd } },
			description: { contains: "need" },
			id: "any",
			timesheet_id: "e1d0b735-2b36-43e9-8d04-967573eed612",
		});
	})
});
