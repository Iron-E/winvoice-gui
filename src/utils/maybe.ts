import type { FieldName } from "./field-name";

/** A value which might have been initialized. */
export type Maybe<T> = NonNullable<T> | undefined;

/**
 * @param obj the object with the field to check
 * @param field the name of the field in `json` which maybe is `<T>`.
 * @param check a function which determines if a given value is `<T>`.
 * @returns whether the `json[fieldName]` is either undefined or an instance of {@link T}.
 */
export function fieldMaybeIs<Obj extends {}>(obj: Obj, field: FieldName, check: (value: unknown) => boolean): boolean {
	if (field in obj) {
		const VALUE = (obj as Record<FieldName, unknown>)[field];
		if (VALUE != undefined) {
			return check(VALUE);
		}
	}

	return true;
}
