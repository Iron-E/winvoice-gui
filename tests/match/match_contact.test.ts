import { type MatchContact as M } from '@/match';

describe('MatchContact', () => {
	test('JSON decoding', () => {
		expect(JSON.parse(`{
			"kind": { "email": "foo@bar.io" },
			"label": { "contains": "Primary" }
		}`)).toStrictEqual<M>({
			kind: { email: "foo@bar.io" },
			label: { contains: "Primary" },
		});
	})
});
