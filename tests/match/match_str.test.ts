import { type MatchStr } from '../../src/match';

type M = MatchStr<string>
describe('testing Match', () => {
	test('JSON decoding', () => {
		expect(JSON.parse(`{
			"and": [
				{ "contains": "f" },
				{ "or": ["any", { "not": "seven" }] },
				{ "regex": "o{2,}$" }
			]
		}`)).toStrictEqual<M>({
			and: [
				{ contains: "f" },
				{ or: ["any", { not: "seven" }] },
				{ regex: "o{2,}$" }
			]
		});
	})
});
