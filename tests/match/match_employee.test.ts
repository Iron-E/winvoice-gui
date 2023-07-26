import { type MatchEmployee as M } from '../../src/match';

describe('testing MatchEmployee', () => {
	test('JSON decoding', () => {
		expect(JSON.parse(`{
			"active": true,
			"department": {"name": "Executive"},
			"id": "any",
			"name": {"regex": "^.*son"},
			"title": {"contains": "C"}
		}`)).toStrictEqual<M>({
			active: true,
			department: { name: "Executive" },
			id: "any",
			name: { regex: "^.*son" },
			title: { "contains": "C" }
		});
	})
});