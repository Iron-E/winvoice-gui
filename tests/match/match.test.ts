import { Match } from '../../src/match';

type M = Match<number>
describe('testing Match', () => {
	test('JSON decoding', () => {
		expect(JSON.parse(`{
			"and": [
				{ "in_range": [0, 10] },
				{ "not": 3 },
				{ "or": ["any", { "greater_than": 5 }] }
			]
		}`)).toStrictEqual<M>({
			and: [
				{ in_range: [0, 10] },
				{ not: 3 },
				{ or: ["any", { greater_than: 5 }] },
			]
		});
	})
});
