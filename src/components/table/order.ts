import React from "react";
import type { Fn, ValueOf } from "@/utils";
import type { ShowMessage } from "../messages";
import { Client } from "../api";
import { Route } from "@/api";

/**
 * How {@link Order} should be valuated when a given {@link Order.column} leads to an ambiguous ordering.
 *
 * @example
 * ```typescript
 * // Given the following type and order…
 * type T = {a: {b: string, c: number}, d: boolean};
 * const ORDER: Order<T> = { column: 'a', ascending: true };
 *
 * // …How can we compare `T.a`? Even if one is 'greater' than the other, they will both be treated as equal by JS.
 * // Answer: disambiguate by using a Valuator.
 *
 * // This valuator says that when the `Order.column` is `a`, it should use the `b` key to determine the order.
 * const VALUATORS: Valuators<T> = { a: { key: 'b' } };
 *
 * // If `a.b` also contained objects, we could valuate further:
 * const VALUATORS: Valuators<T> = { a: { key: 'b', valuators: { foo: { key: 'bar' } } } };
 * ```
 */
export type Valuators<T> = {
	[key in keyof T]?: {
		key: keyof NonNullable<T[key]>,
		valuators?: Valuators<NonNullable<T[key]>>,
	};
};

/** The order by which rows in a table are sorted. */
export type Order<T> = Readonly<{
	/** whether the order is sorted from most to least, or least to most. */
	ascending: boolean,

	/** The column which the data is sorted by. */
	column: T,
}>;

/**
 * @param defaultColumn the {@link Order.column | column} that is used to sort the data by default.
 * @returns {@link Order<T>} (w/ {@link Order.ascending | `ascending === false`}) as {@link React.useState | state}.
 */
export function useOrder<T>(defaultColumn: T): [Order<T>, Fn<[order: Order<T>]>] {
	return React.useState<Order<T>>({ ascending: false, column: defaultColumn });
}

export class OrderedData<T> {
	/** mutate the  {@link OrderedData.data} */
	public readonly setData?: Fn<[data: readonly T[], valuators?: Valuators<NonNullable<T>>]>;

	/** the information that is being {@link OrderedData.order}ed */
	public readonly setOrder: Fn<[order: Order<keyof T>, valuators?: Valuators<NonNullable<T>>]>;

	constructor(
		/** the order of the {@link OrderedData.data} */
		public readonly order: Order<keyof T>,
		setOrder: Fn<[data: Order<keyof T>]>,

		/** the information that is being {@link OrderedData.order}ed */
		public readonly data: readonly T[],
		setData?: Fn<[data: readonly T[]]>,

		/** The default {@link Valuators} used for {@link OrderedData.setData} & {@link OrderedData.setOrder} */
		defaultValuators?: Valuators<NonNullable<T>>,
	) {
		if (setData != undefined) {
			this.setData = (d, x) => setData(OrderedData.reorder(d, order, x ?? defaultValuators));
			this.setOrder = (o, x) => {
				setData(OrderedData.reorder(data, o, x ?? defaultValuators));
				setOrder(o);
			};
		} else {
			this.setOrder = setOrder;
		}
	}

	/**
	 * @param data what to sort
	 * @param order what to sort by. `undefined` values are treated as less than all others.
	 * @param valuators what to sort by when the `order` indicates that the {@link Order.column} is an {@link object}.
	 * @returns the `data` sorted according to the `order`.
	 */
	private static reorder<T>(data: readonly T[], order: Order<keyof NonNullable<T>>, valuators?: Valuators<NonNullable<T>>): readonly T[] {
		const VALUATORS = { key: order.column, valuators };

		return [...data].sort((d1, d2) => {
			const [d1Value, d2Value] = OrderedData.valueOf<{ _: T }>(d1, d2, VALUATORS);

			if (d1Value < d2Value || d1Value == undefined && d2Value != undefined) {
				var value = -1;
			} else if (d1Value > d2Value || d1Value != undefined && d2Value == undefined) {
				var value = 1;
			} else /* d1Value === d2Value */ {
				var value = 0;
			}

			return order.ascending ? value * -1 : value;
		});
	}

	/** @returns the value `obj[key]` based on the {@link Valuators} provided. */
	private static valueOf<T>(
		value1: ValueOf<T>,
		value2: ValueOf<T>,
		valuator: NonNullable<Valuators<T>[keyof T]>,
	): [any, any] {
		while ((value1 && value2 && valuator) != undefined) {
			value1 = (value1 as NonNullable<ValueOf<T>>)[valuator.key] as any;
			value2 = (value2 as NonNullable<ValueOf<T>>)[valuator.key] as any;
			valuator = valuator.valuators?.[valuator.key] as any;
		}

		return [value1, value2];
	}

	/** Append `value` to the {@link OrderedData.data | existing data}. */
	public append(this: OrderedData<T>, value: T): void {
		this.setData?.([...this.data, value]);
	}

	/**
	 * Similar to {@link OrderedData.remove}, but also makes an {@link Client.delete | API request} to permanently remove
	 * the data.
	 */
	public async delete(
		this: OrderedData<T>,
		client: Readonly<Client>,
		showMessage: ShowMessage,
		route: Route,
		values: readonly T[],
	): Promise<void> {
		if (await client.delete(showMessage, route, { entities: values })) {
			this.remove(values);
		}
	}

	/** Reruns the previous {@link reorder} operation, except with different `valuators`. */
	public refresh(this: OrderedData<T>, valuators: Valuators<NonNullable<T>>): void {
		this.setData?.(this.data, valuators);
	}

	/** Filter out the `value` from the {@link OrderedData.data}. */
	public remove(this: OrderedData<T>, values: readonly T[]): void {
		this.setData?.(this.data.filter(d => values.some(v => v !== d)));
	}
}

/**
 * A hook that stores some data and its order in {@link React.useState | state}.
 * @param defaultColumn the column which is used to sort the rows by default.
 * @returns two sets of {@link React.useState}'s return: the first for the data, the second for the {@link Order}.
 */
export function useOrderedData<T>(defaultColumn: keyof T, defaultValuators?: Valuators<NonNullable<T>>): OrderedData<T> {
	const [DATA, setData] = React.useState<readonly T[]>([]);
	const [ORDER, setOrder] = useOrder<keyof T>(defaultColumn);

	return new OrderedData<T>(ORDER, setOrder, DATA, setData, defaultValuators);
}
