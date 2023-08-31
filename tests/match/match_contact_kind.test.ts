import { type MatchContactKind as M } from '@/match';

describe('Match', () => {
	test('JSON decoding', () => {
		expect(JSON.parse('{ "address": { "id": "3" } }')).toStrictEqual<M>({ address: { id: '3' } });
		expect(JSON.parse('"any"')).toStrictEqual<M>("any");
		expect(JSON.parse('{ "email": "foo" }')).toStrictEqual<M>({ email: "foo" });
		expect(JSON.parse('{ "other": "foo" }')).toStrictEqual<M>({ other: "foo" });
		expect(JSON.parse('{ "phone": "foo" }')).toStrictEqual<M>({ phone: "foo" });
	})
});
