import { type MatchDepartment as M } from '@/match';

describe('testing MatchDepartment', () => {
	test('JSON decoding', () => {
		expect(JSON.parse(`{ "id": "any", "name": "json" }`)).toStrictEqual<M>({ id: "any", name: "json" });
	})
});
