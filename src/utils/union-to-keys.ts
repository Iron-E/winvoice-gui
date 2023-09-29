import type { FieldName } from "./field-name";

/**
 * Allows projecting `K` and `V` into `{[K]: V}`.
 *
 * @typeParam K the keys to make a union from
 * @typeParam V the values that will be made out of the keys `K`
 * @example
 * ```typescript
 * type Example = UnionToKeys<'a' | 'b', string>;
 * let foo: Example = {a: 'foo'};
 * let bar: Example = {b: 'foo'};
 * let baz: Example = {c: 'foo'}; -- error!
 * ```
 */
export type UnionToKeys<K extends FieldName, V> = K extends K ? Record<K, V> : never;
