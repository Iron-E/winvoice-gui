import { type MatchDepartment as M } from '../../src/match';

describe('testing Match', () => {
	test('JSON decoding', () => {
		expect(JSON.parse(`{ "id": "any", "name": "json" }`)).toStrictEqual<M>({ id: "any", name: "json" });
	})
});
