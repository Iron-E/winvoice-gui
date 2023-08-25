/** Associates some value with a key. */
export type LookupTable<K extends string | number | symbol, V> = Readonly<Record<K, V>>;
