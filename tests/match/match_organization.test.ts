import { type MatchOrganization as M } from '@/match';

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
