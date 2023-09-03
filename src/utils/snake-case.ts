/** Converts the given `<T>` into snakecase. */
export type Snakecase<T extends string> = Lowercase<T extends `${infer L} ${infer R}` | `${infer L}-${infer R}`? `${L}_${R}` : T>;
