/** The same as {@link Fn} except `Return` is wrapped in `Promise`. */
export type AsyncFn<Params extends any[] = [], Return = void> = Fn<Params, Promise<Return>>;

/**
 * A type which can convert a tuple of function arguments and a return type to a function type.
 *
 * @example
 * ```typescript
 * type HandleButtonClick = Func<[foo: string, bar: number], void>; // (foo: string, bar: number) => void
 * ```
 */
export type Fn<Params extends any[] = [], Return = void> = Params extends [...infer Param] ? (...param: Param) => Return : never;
