import type { Match, MatchSet } from '../../src/match';

type M = MatchSet<Match<number>>
describe('testing MatchSet', () => {
	test('JSON decoding', () => {
		expect(JSON.parse(`{
			"and": [
				{ "not": { "contains": 3 } },
				{
					"or": ["any", { "contains": { "greater_than": 5 } }]
				}
			]
		}`)).toStrictEqual<M>({
			and: [
				{ not: { contains: 3 } },
				{
					or: ["any", { contains: { greater_than: 5 } }],
				},
			]
		});
	})
});
