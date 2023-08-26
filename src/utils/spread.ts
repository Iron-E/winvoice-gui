/**
 * Simulate the spread operator to do the equivalent of `type A = ...B & C;` such that fields from `C` override those
 * from `B` without producing {@link never} like `type A = B & C` does.
 *
 * @example
 * ```typescript
 * // resolves to `{ a: string, b: string, c: string}`.
 * type A = Spread<{ a: string, b: number }, { b: string, c: string }>;
 * ```
 */
export type Spread<Defaults, Rest> = Omit<Defaults, keyof Rest> & Rest;
