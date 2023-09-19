import type { Id, On } from "../props-with";

/** Base properties for all derivative forms. */
export type BaseProps<T> = On<'submit', [value: T]> & Required<Id> & {
	/** Whether or not all editable fields should be shown. */
	allFields?: boolean,

	/** The initial values of the form. */
	initialValues?: T,
};
