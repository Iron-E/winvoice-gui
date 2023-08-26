import { type FieldName } from './field-name';

/** Associates some value with a key. */
export type LookupTable<K extends FieldName, V> = Readonly<Record<K, V>>;
