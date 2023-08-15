/**
 * A type which can convert a tuple of function arguments and a return type to a function type.
 *
 * @example
 * ```typescript
 * type HandleButtonClick = Func<[foo: string, bar: number], void>; // (foo: string, bar: number) => void
 * ```
 */
export type Func<Params extends any[], Ret> = Params extends [...infer Param] ? (...param: Param) => Ret : never;
