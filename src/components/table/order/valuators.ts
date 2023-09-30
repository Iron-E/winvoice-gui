import type { NonNullUnit } from "@/utils";

/**
 * How {@link Order} should be valuated when a given {@link Order.column} leads to an ambiguous ordering.
 *
 * @example
 * ```typescript
 * // Given the following type and order…
 * type T = {a: {b: string, c: number}, d: boolean};
 * const ORDER: Order<T> = { column: 'a', ascending: true };
 *
 * // …How can we compare `T.a`? Even if one is 'greater' than the other, they will both be treated as equal by JS.
 * // Answer: disambiguate by using a Valuator.
 *
 * // This valuator says that when the `Order.column` is `a`, it should use the `b` key to determine the order.
 * const VALUATORS: Valuators<T> = { a: { key: 'b' } };
 *
 * // If `a.b` also contained objects, we could valuate further:
 * const VALUATORS: Valuators<T> = { a: { key: 'b', valuators: { foo: { key: 'bar' } } } };
 * ```
 */
export type Valuators<T> =
	T extends T
	? {
		[key in keyof NonNullUnit<T>]?:
		| { map: (value: NonNullUnit<NonNullUnit<T>[key]>) => any }
		| {
			key: keyof NonNullUnit<NonNullUnit<T>[key]>,
			valuators?: Valuators<NonNullUnit<T>[key]>,
		};
	}
	: never
	;
