import { Match } from '../../src/match';

type M = Match<number>
describe('testing Match', () => {
	test('JSON decoding', () => {
		expect(JSON.parse('3')).toStrictEqual<M>(3);
		expect(JSON.parse('{"and": [ {"not": 3}, {"in_range": [0, 10]} ]}')).toStrictEqual<M>({
			and: [
				{ not: 3 },
				{ in_range: [0, 10] },
			]
		});
	})

	test('JSON encoding', () => {
	})
});
