import { BaseProps } from "../props";

/** {@link BaseProps} for a search form. */
export type SearchProps<T> = Omit<BaseProps<T[]>, 'initialValues'>;
