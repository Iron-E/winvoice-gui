import { type MatchOrganization as M } from '../../src/match';

describe('testing MatchOrganization', () => {
	test('JSON decoding', () => {
		expect(JSON.parse(`{
			"id": "any",
			"location": { "outer": { "some": { "name": "Mexico" } } },
			"name": "Some Company"
		}`)).toStrictEqual<M>({
			id: "any",
			location: { outer: { some: { name: "Mexico" } } },
			name: "Some Company"
		});
	})
});
