import React from "react";
import type { FieldName, Fn, NonNullUnit, ReadonlyNonNullUnitArray, Unit, ValueOf, ValueOfUnit } from "@/utils";
import type { ShowMessage } from "../messages";
import { Client } from "../api";
import { UserInputRoute } from "@/api";

/**
 * @param value the value to retrieve the id of
 * @returns the `<Id>` of the `value`.
 */
type GetId<T, Id> = (value: NonNullUnit<T>) => Id;

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
export type Valuators<T> =
	T extends T
	? {
		[key in keyof NonNullUnit<T>]?:
		| { map: (value: NonNullUnit<NonNullUnit<T>[key]>) => any }
		| {
			key: keyof NonNullUnit<NonNullUnit<T>[key]>,
			valuators?: Valuators<NonNullUnit<T>[key]>,
		};
	}
	: never
	;

/** The order by which rows in a table are sorted. */
export type Order<T> = Readonly<{
	/** whether the order is sorted from most to least, or least to most. */
	ascending: boolean,

	/** The column which the data is sorted by. */
	column: T,
}>;

/** The return type of {@link useOrder}. */
export type UseOrder<T> = [Order<keyof T>, Fn<[order: Order<keyof T>]>];

/**
 * @param defaultColumn the {@link Order.column | column} that is used to sort the data by default.
 * @returns {@link Order<T>} (w/ {@link Order.ascending | `ascending === false`}) as {@link React.useState | state}.
 */
export function useOrder<T>(defaultColumn: keyof T): UseOrder<T> {
	return React.useState<Order<keyof T>>({ ascending: false, column: defaultColumn });
}

export class OrderedData<T extends {}> {
	/** mutate the  {@link OrderedData.data} */
	public readonly setData?: Fn<[data: ReadonlyNonNullUnitArray<T>, valuators?: Valuators<T>]>;

	/** the information that is being {@link OrderedData.order}ed */
	public readonly setOrder: Fn<[order: Order<keyof NonNullUnit<T>>, valuators?: Valuators<T>]>;

	constructor(
		/** the order of the {@link OrderedData.data} */
		public readonly order: Order<keyof NonNullUnit<T>>,
		setOrder: Fn<[data: Order<keyof NonNullUnit<T>>]>,

		/** the information that is being {@link OrderedData.order}ed */
		public readonly data: ReadonlyNonNullUnitArray<T>,
		setData?: Fn<[data: ReadonlyNonNullUnitArray<T>]>,

		/** The default {@link Valuators} used for {@link OrderedData.setData} & {@link OrderedData.setOrder} */
		defaultValuators?: Valuators<T>,
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
	private static reorder<T extends {}>(
		data: ReadonlyNonNullUnitArray<T>,
		order: Order<keyof NonNullUnit<T>>,
		valuators?: Valuators<T>,
	): ReadonlyNonNullUnitArray<T> {
		const VALUATORS: ValueOf<Valuators<{ _: Unit<T> }>> = {
			key: order.column as keyof NonNullUnit<Unit<T>>,
			valuators: valuators as unknown as Valuators<Unit<T>>,
		};

		return [...data].sort((d1, d2) => {
			const [d1Value, d2Value] = OrderedData.valueOf<{ _: Unit<T> }>(d1, d2, VALUATORS);

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
		value1: ValueOfUnit<T>,
		value2: ValueOfUnit<T>,
		valuator: ValueOf<Valuators<T>>,
	): [any, any] {
		while ((value1 && value2 && valuator) != undefined) {
			if ('map' in valuator) {
				value1 = valuator.map(value1 as ValueOfUnit<T>);
				value2 = valuator.map(value2 as ValueOfUnit<T>);
				break;
			}

			value1 = (value1 as ValueOfUnit<T>)[valuator.key] as any;
			value2 = (value2 as ValueOfUnit<T>)[valuator.key] as any;
			valuator = valuator.valuators?.[valuator.key] as any;
		}

		return [value1, value2];
	}

	/** Append `value` to the {@link OrderedData.data | existing data}. */
	public append(this: OrderedData<T>, value: NonNullUnit<T>): void {
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
		route: UserInputRoute,
		entities: ReadonlyNonNullUnitArray<T>,
	): Promise<void> {
		if (await client.delete(showMessage, route, { entities })) {
			this.remove(entities);
		}
	}

	/**
	 * Make an {@link Client.edit | API request} to permanently change the given, and also change it in the stored data.
	 */
	public async edit<Id extends FieldName>(
		this: OrderedData<T>,
		client: Readonly<Client>,
		showMessage: ShowMessage,
		route: UserInputRoute,
		entities: Partial<Record<Id, NonNullUnit<T>>>,
		getId: GetId<T, Id>,
	): Promise<void> {
		if (await client.patch(showMessage, route, { entities: Object.values(entities) })) {
			this.map(value => entities[getId(value)] ?? value);
		}
	}

	/**
	 * {@link OrderedData.setData | Set the data} to the result of a `mapping` operation performed on the
	 * {@link OrderedData.data | existing data }.
	 *
	 * @param mapping the function to call on the existing data.
	 */
	public map(
		this: OrderedData<T>,
		mapping: (value: NonNullUnit<T>, index: number, array: ReadonlyNonNullUnitArray<T>) => NonNullUnit<T>,
	): void {
		this.setData?.(this.data.map(mapping));
	}

	/** Reruns the previous {@link reorder} operation, except with different `valuators`. */
	public refresh(this: OrderedData<T>, valuators: Valuators<T>): void {
		this.setData?.(this.data, valuators);
	}

	/** Filter out the `value` from the {@link OrderedData.data}. */
	public remove(this: OrderedData<T>, values: ReadonlyNonNullUnitArray<T>): void {
		this.setData?.(this.data.filter(d => values.some(v => v !== d)));
	}

	/** Filter out the `value` from the {@link OrderedData.data}. */
	public swap<Id>(
		this: OrderedData<T>,
		getId: GetId<T, Id>,
		replacedId: Id,
		replacement: NonNullUnit<T>,
	): void {
		this.map(v => getId(v) === replacedId ? replacement : v);
	}
}

/**
 * A hook that stores some data and its order in {@link React.useState | state}.
 * @param defaultColumn the column which is used to sort the rows by default.
 * @returns two sets of {@link React.useState}'s return: the first for the data, the second for the {@link Order}.
 */
export function useOrderedData<T extends {}>(
	defaultColumn: keyof NonNullUnit<T>,
	defaultValuators?: Valuators<T>,
): OrderedData<T> {
	const [DATA, setData] = React.useState<OrderedData<T>['data']>([]);
	const [ORDER, setOrder] = useOrder<NonNullUnit<T>>(defaultColumn);


	return new OrderedData<T>(ORDER, setOrder, DATA, setData, defaultValuators);
}
