type TestFn = (testName: string, value: unknown) => void;
type FieldsFn = <T extends {}>(
	base: Readonly<T>,
	fields: [fieldName: string, invalidValue: unknown, optional?: true][],
) => void;

/**
 * @param narrowingFunction the function to apply on each of the return functions.
 * @returns two functions, one which asserts the narrowing function is `true`, and the other for `false`.
 */
export function testNarrowing<T>(narrowingFunction: (v: unknown) => v is T): [FieldsFn, TestFn, TestFn] {
	function testWrap(narrowed: boolean): TestFn {
		return (t, v) => test(t, () => expect(narrowingFunction(v)).toStrictEqual(narrowed));
	}

	const t = testWrap(true);
	const f = testWrap(false);

	f('Invalid', { foo: 'bar' });
	f('Null', null);
	f('Undefined', undefined);

	return [(base, fields) => {
		t('Valid', base);
		fields.forEach(([field, val, optional]) => {
			f(`w/ invalid ${field}`, { ...base, [field]: val });
			(optional === true ? t : f)(`w/o ${field}`, { ...base, [field]: undefined });
		});
	}, t, f];
}
