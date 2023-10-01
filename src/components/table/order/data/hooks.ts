import React from "react";
import type { Maybe, NonNullUnit } from "@/utils";
import type { Valuators } from "../valuators";
import { OrderedData } from "../data";
import { useOrder } from "../hooks";

type GetValuators<T, K> = (keys: K) => Valuators<T>;

/**
 * A hook that stores some data and its order in {@link React.useState | state}.
 * @param defaultColumn the column which is used to sort the rows by default.
 * @returns two sets of {@link React.useState}'s return: the first for the data, the second for the {@link Order}.
 */
export function useOrderedData<T extends {}>(
	defaultColumn: keyof NonNullUnit<T>,
	valuators?: Valuators<T>,
): OrderedData<T>;
export function useOrderedData<T extends {}, K>(
	defaultColumn: keyof NonNullUnit<T>,
	revaluator: GetValuators<T, K>,
	keys: K,
): [OrderedData<T>, ReturnType<typeof OrderedData.keySwapper<K, (keys: K) => Valuators<T>>>];
export function useOrderedData<T extends {}, K>(
	defaultColumn: keyof NonNullUnit<T>,
	revaluator?: Valuators<T> | GetValuators<T, K>,
	keys?: K,
): OrderedData<T> | [OrderedData<T>, ReturnType<typeof OrderedData.keySwapper<K, (keys: K) => Valuators<T>>>] {
	const [DATA, setData] = React.useState<OrderedData<T>['data']>([]);
	const [ORDER, setOrder] = useOrder<NonNullUnit<T>>(defaultColumn);

	return (keys == undefined
		? new OrderedData(ORDER, setOrder, DATA, setData, revaluator as Maybe<Valuators<T>>)
		: [
			new OrderedData<T>(ORDER, setOrder, DATA, setData, (revaluator as GetValuators<T, K>)(keys)),
			OrderedData.keySwapper(keys, revaluator as GetValuators<T, K>),
		]
	);
}
