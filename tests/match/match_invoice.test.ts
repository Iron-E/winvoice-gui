import { type MatchInvoice as M } from '@/match';
import { Currency } from '../../src/schema';

describe('MatchInvoice', () => {
	test('JSON decoding', () => {
		expect(JSON.parse(`{
			"date_issued": { "some": { "in_range": ["2022-01-01T00:00:00", "2023-01-01T00:00:00"] } },
			"date_paid": "none",
			"hourly_rate": { "amount": "15.00", "currency": "USD" }
		}`)).toStrictEqual<M>({
			date_issued: { some: { in_range: ["2022-01-01T00:00:00", "2023-01-01T00:00:00"] } },
			date_paid: "none",
			hourly_rate: { amount: "15.00", currency: Currency.Usd }
		});
	})
});
