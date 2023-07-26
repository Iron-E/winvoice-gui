import { type MatchJob as M } from '../../src/match';

describe('testing MatchJob', () => {
	test('JSON decoding', () => {
		expect(JSON.parse(`{
			"client": { "location": { "name": {"contains": "New"} } },
			"date_close": "none",
			"date_open": { "in_range": ["2022-05-01T00:00:00", "2022-05-02T00:00:00"] },
			"departments": { "contains": {"name": "Executive"} },
			"id": "any",
			"increment": "5min",
			"invoice": { "date_issued": "none", "date_paid": "none" },
			"notes": { "contains": "here is some multiline text.and some more text." },
			"objectives": "any"
		}`)).toStrictEqual<M>({
			client: { location: { name: {contains: "New"} } },
			date_close: "none",
			date_open: { in_range: ["2022-05-01T00:00:00", "2022-05-02T00:00:00"] },
			departments: { contains: {name: "Executive"} },
			id: "any",
			increment: "5min",
			invoice: { date_issued: "none", date_paid: "none" },
			notes: { contains: `here is some multiline text.and some more text.` },
			objectives: "any"
		});
	})
});
