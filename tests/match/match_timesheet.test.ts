import { type MatchTimesheet as M } from '../../src/match';

describe('testing MatchTimesheet', () => {
	test('JSON decoding', () => {
		expect(JSON.parse(`{
			"id": "any",
			"employee": {
			  "name": {"regex": "^[JR]on$"}
			},
			"expenses": {"contains": {
			  "category": "Travel"
			}},
			"job": {
			  "client": {
			    "name": {"contains": "International"}
			  }
			},
			"time_begin": {"less_than": "2022-01-01T00:00:00"},
			"time_end": "none",
			"work_notes": "any"
		}`)).toStrictEqual<M>({
			id: "any",
			employee: { name: { regex: "^[JR]on$" } },
			expenses: { contains: { category: "Travel" } },
			job: { client: { name: { contains: "International" } } },
			time_begin: { less_than: "2022-01-01T00:00:00" },
			time_end: "none",
			work_notes: "any",
		});
	})
});
