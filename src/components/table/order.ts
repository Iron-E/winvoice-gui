import React from "react";

/** The order by which rows in a table are sorted. */
export type Order<T> = Readonly<{
	/** The column which the data is sorted by. */
	column: T,

	/** */
	ascending: boolean,
}>;

export type OrderedData<T> = Readonly<{
	data: readonly T[],
	order: Order<keyof T>,
}>;

/**
 * @param defaultColumn the {@link Order.column | column} that is used to sort the data by default.
 * @return {@link Order<T>} (w/ {@link Order.ascending | `ascending === false`}) as {@link React.useState | state}.
 */
export function useOrder<T>(defaultColumn: T): [Order<T>, React.Dispatch<React.SetStateAction<Order<T>>>] {
	return React.useState<Order<T>>({ ascending: false, column: defaultColumn });
}

/** @return the `data` sorted according to the `order`. */
function orderData<T>(data: ReadonlyArray<T>, order: Order<keyof T>): ReadonlyArray<T> {
	return [...data].sort((d1, d2) => {
		if (d1[order.column] < d2[order.column]) {
			var value = -1;
		} else if (d1[order.column] > d2[order.column]) {
			var value = 1;
		} else {
			var value = 0;
		}

		return order.ascending ? value * -1 : value;
	});
}

/**
 * A hook that stores some data and its order in {@link React.useState | state}.
 * @param defaultColumn the column which is used to sort the rows by default.
 * @return two sets of {@link React.useState}'s return: the first for the data, the second for the {@link Order}.
 */
export function useOrderedData<T>(
	defaultColumn: keyof T,
): [OrderedData<T>, (data: OrderedData<T>['data']) => void, (order: OrderedData<T>['order']) => void] {
	const [DATA, setData] = React.useState<readonly T[]>([]);
	const [ORDER, setOrder] = useOrder<keyof T>(defaultColumn);

	return [
		{ data: DATA, order: ORDER },
		d => setData(orderData(d, ORDER)),
		o => {
			setData(orderData(DATA, o));
			setOrder(o);
		},
	];
}
