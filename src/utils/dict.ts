import type { FieldName } from "./field-name";

/** A {@link Readonly} {@link Partial} {@link Record} */
export type Dict<K extends FieldName, V> = Readonly<Partial<Record<K, V>>>;
