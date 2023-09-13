import type { On } from "../props-with";
import { OrderedData } from "./order";

/** The base properties for all derivative tables. */
export type BaseProps<T, Id> = On<'rowSelect', [value: T]> & {
	deletable?: boolean,
	orderedData: OrderedData<T>,
	selectedRow?: Id,
};
