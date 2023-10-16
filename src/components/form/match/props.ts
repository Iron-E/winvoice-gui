import type { BaseProps as FormProps } from "../props";
import type { BaseProps as TableProps } from "@/components/table/props";

/** {@link BaseProps} for a search form. */
export type SearchProps<T extends {}> =
	& Omit<FormProps<T[]>, 'initialValues'>
	& Pick<TableProps<T, never>, 'onRowSelect'>
	;
