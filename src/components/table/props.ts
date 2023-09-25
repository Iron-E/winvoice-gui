import type { On } from "../props-with";
import { OrderedData, UseOrder } from "./order";

/** The base properties for all derivative tables. */
export type BaseProps<T, Key extends keyof T> = On<'rowSelect', [value: T]> & {
	deletable?: boolean,
	orderedData: OrderedData<T>,
	selectedRow?: T[Key],
};

/** The {@link ReturnType} of {@link useOrder} structured as properties of a {@link React.ReactElement}. */
export type OrderProps<K extends string, T> =
	& Required<On<`reorder${Capitalize<K>}`, Parameters<UseOrder<T>[1]>>>
	& Record<`${Uncapitalize<K>}Order`, UseOrder<T>[0]>
	;
