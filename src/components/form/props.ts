import type { Id, On } from "../props-with";

/** Base properties for all derivative forms. */
export type BaseProps<T> = On<'submit', [value: T]> & Required<Id> & { initialValues?: T };
