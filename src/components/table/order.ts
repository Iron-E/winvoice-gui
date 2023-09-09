import type { Fn } from "@/utils";
import React from "react";

/**
 * Extractors for the {@link useOrderedData}.
 * For example, this enforces that for some type `{a: {b: string, c: number}}`, `a` must be mapped to either `b` or `c`.
 */
type Extractors<T> = {
	[key in keyof T]?: (value: NonNullable<T[key]>) => any;
};

/** The order by which rows in a table are sorted. */
export type Order<T> = Readonly<{
	/** The column which the data is sorted by. */
	column: T,

	/** */
	ascending: boolean,
}>;

/**
 * @param defaultColumn the {@link Order.column | column} that is used to sort the data by default.
 * @return {@link Order<T>} (w/ {@link Order.ascending | `ascending === false`}) as {@link React.useState | state}.
 */
export function useOrder<T>(defaultColumn: T): [Order<T>, Fn<[order: Order<T>]>] {
	return React.useState<Order<T>>({ ascending: false, column: defaultColumn });
}

export class OrderedData<T> {
	/** mutate the  {@link OrderedData.data} */
	public readonly setData?: Fn<[data: readonly T[], extractors?: Extractors<T>]>;

	/** the information that is being {@link OrderedData.order}ed */
	public readonly setOrder: Fn<[order: Order<keyof T>, extractors?: Extractors<T>]>;

	constructor(
		/** the order of the {@link OrderedData.data} */
		public readonly order: Order<keyof T>,
		setOrder: Fn<[data: Order<keyof T>]>,

		/** the information that is being {@link OrderedData.order}ed */
		public readonly data: readonly T[],
		setData?: Fn<[data: readonly T[]]>,

		/** The default {@link Extractors} used for {@link OrderedData.setData} & {@link OrderedData.setOrder} */
		defaultExtractors?: Extractors<T>,
	) {
		if (setData != undefined) {
			this.setData = (d, x) => setData(OrderedData.reorder(d, order, x ?? defaultExtractors));
			this.setOrder = (o, x) => {
				setData(OrderedData.reorder(data, o, x ?? defaultExtractors));
				setOrder(o);
			};
		} else {
			this.setOrder = setOrder;
		}
	}

	/**
	 * @param data what to sort
	 * @param order what to sort by
	 * @param extractors what to sort by when the `order` indicates that the {@link Order.column} is an {@link object}.
	 * @return the `data` sorted according to the `order`.
	 */
	private static reorder<T>(data: readonly T[], order: Order<keyof T>, extractors?: Extractors<T>): readonly T[] {
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

	/** Append `value` to the {@link OrderedData.data | existing data}. */
	public appendData(this: OrderedData<T>, value: T): void {
		this.setData?.([...this.data, value]);
	}

	/** Reruns the previous {@link reorder} operation, except with different `extractors`. */
	public refresh(this: OrderedData<T>, extractors: Extractors<T>): void {
		this.setData?.(this.data, extractors);
	}
}

/**
 * A hook that stores some data and its order in {@link React.useState | state}.
 * @param defaultColumn the column which is used to sort the rows by default.
 * @return two sets of {@link React.useState}'s return: the first for the data, the second for the {@link Order}.
 */
export function useOrderedData<T>(defaultColumn: keyof T, defaultExtractors?: Extractors<T>): OrderedData<T> {
	const [DATA, setData] = React.useState<readonly T[]>([]);
	const [ORDER, setOrder] = useOrder<keyof T>(defaultColumn);

	return new OrderedData<T>(ORDER, setOrder, DATA, setData, defaultExtractors);
}
