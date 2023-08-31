import { type MatchDepartment as M } from '@/match';

describe('MatchDepartment', () => {
	test('JSON decoding', () => {
		expect(JSON.parse(`{ "id": "any", "name": "json" }`)).toStrictEqual<M>({ id: "any", name: "json" });
	})
});
