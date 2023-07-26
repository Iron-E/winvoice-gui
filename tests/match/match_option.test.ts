import type { Match, MatchOption } from '../../src/match';

type M = MatchOption<Match<number>>
describe('testing Match', () => {
	test('JSON decoding', () => {
		expect(JSON.parse('"any"')).toStrictEqual<M>("any");
		expect(JSON.parse('"none"')).toStrictEqual<M>("none");
		expect(JSON.parse(`{ "none_or": 3 }`)).toStrictEqual<M>({ none_or: 3 });
		expect(JSON.parse(`{ "some": 3 }`)).toStrictEqual<M>({ some: 3 });
	})
});
