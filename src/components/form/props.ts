import type { Id, On } from "../props-with";

/** Base properties for all derivative forms. */
export type BaseProps<T> = On<'submit', [value: T]> & Id & { initialValues?: T };
