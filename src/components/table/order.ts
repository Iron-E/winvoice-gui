import { Fn } from "@/utils";
import React from "react";

/** The order by which rows in a table are sorted. */
export type Order<T> = Readonly<{
	/** The column which the data is sorted by. */
	column: T,

	/** */
	ascending: boolean,
}>;

/**
 * Extractors for the {@link useOrderedData}.
 * For example, this enforces that for some type `{a: {b: string, c: number}}`, `a` must be mapped to either `b` or `c`.
 */
type Extractors<T> = {
	[key in keyof T]?: (value: NonNullable<T[key]>) => any;
};

export type OrderedData<T> = Readonly<{
	data: Readonly<{ get: readonly T[], set?: Fn<[data: readonly T[], extractors?: Extractors<T>]> }>,
	order: Readonly<{ get: Order<keyof T>, set: Fn<[order: Order<keyof T>, extractors?: Extractors<T>]> }>,
}>;

/**
 * @param defaultColumn the {@link Order.column | column} that is used to sort the data by default.
 * @return {@link Order<T>} (w/ {@link Order.ascending | `ascending === false`}) as {@link React.useState | state}.
 */
export function useOrder<T>(defaultColumn: T): [Order<T>, Fn<[order: Order<T>]>] {
	return React.useState<Order<T>>({ ascending: false, column: defaultColumn });
}

/**
 * @param data what to sort
 * @param order what to sort by
 * @param extractors what to sort by when the `order` indicates that the {@link Order.column} is an {@link object}.
 * @return the `data` sorted according to the `order`.
 */
export function orderData<T>(data: readonly T[], order: Order<keyof T>, extractors?: Extractors<T>): readonly T[] {
	const extractor = extractors?.[order.column];

	return [...data].sort((d1, d2) => {
		let d1Value = d1[order.column];
		let d2Value = d2[order.column];
		if (extractor != undefined) {
			if (d1Value != undefined) {
				d1Value = extractor(d1Value);
			}

			if (d2Value != undefined) {
				d2Value = extractor(d2Value);
			}
		}

		if (d1Value < d2Value) {
			var value = -1;
		} else if (d1Value > d2Value) {
			var value = 1;
		} else /* the values are equal */ {
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
export function useOrderedData<T>(defaultColumn: keyof T): OrderedData<T> & { data: Required<OrderedData<T>['data']> } {
	const [DATA, setData] = React.useState<readonly T[]>([]);
	const [ORDER, setOrder] = useOrder<keyof T>(defaultColumn);

	return {
		data: {
			get: DATA,
			set: (d, x) => setData(orderData(d, ORDER, x)),
		},
		order: {
			get: ORDER,
			set: (o, x) => {
				setData(orderData(DATA, o, x));
				setOrder(o);
			},
		},
	};
}
