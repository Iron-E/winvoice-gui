import type { NonNullUnit } from "./unit";

/**
 * The types of the values of `<T>`.
 *
 * @example
 * ```typescript
 * type A = ValueOf<{a: number, b: string}>; // `string | number`
 * ```
 */
export type ValueOf<T, K extends keyof NonNullable<T> = keyof NonNullable<T>> =
	T extends T
	? NonNullable<NonNullable<T>[K]>
	: never
	;

/** {@link ValueOf} with {@link Unit} applied. */
export type ValueOfUnit<T, K extends keyof NonNullUnit<T> = keyof NonNullUnit<T>> = ValueOf<NonNullUnit<T>, K>;
