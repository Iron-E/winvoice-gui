import React from "react";
import type { Maybe, NonNullUnit } from "@/utils";
import type { Valuators } from "../valuators";
import { OrderedData } from "../data";
import { useOrder } from "../hooks";

type GetValuators<T, Param> = (obj: Param) => Valuators<T>;
type UseOrderedData<T extends {}, Param> = [
	OrderedData<T>,
	ReturnType<typeof OrderedData.keySwapper<Param, (obj: Param) => Valuators<T>>>,
];

/** The return type of {@link useOrder}. */
export type UseTable<T extends {}> = [OrderedData<T>, Maybe<React.ReactElement>];

/**
 * A hook that stores some data and its order in {@link React.useState | state}.
 * @param defaultColumn the column which is used to sort the rows by default.
 * @returns two sets of {@link React.useState}'s return: the first for the data, the second for the {@link Order}.
 */
export function useOrderedData<T extends {}>(
	defaultColumn: keyof NonNullUnit<T>,
	valuators?: Valuators<T>,
): OrderedData<T>;
export function useOrderedData<T extends {}, Param>(
	defaultColumn: keyof NonNullUnit<T>,
	revaluator: GetValuators<T, Param>,
	revaluatorParam: Param,
): UseOrderedData<T, Param>
export function useOrderedData<T extends {}, Param>(
	defaultColumn: keyof NonNullUnit<T>,
	revaluator?: Valuators<T> | GetValuators<T, Param>,
	revaluatorParam?: Param,
): OrderedData<T> | UseOrderedData<T, Param> {
	const [DATA, setData] = React.useState<OrderedData<T>['data']>([]);
	const [ORDER, setOrder] = useOrder<NonNullUnit<T>>(defaultColumn);

	return (revaluatorParam == undefined
		? new OrderedData(ORDER, setOrder, DATA, setData, revaluator as Maybe<Valuators<T>>)
		: [
			new OrderedData<T>(ORDER, setOrder, DATA, setData, (revaluator as GetValuators<T, Param>)(revaluatorParam)),
			OrderedData.keySwapper(revaluator as GetValuators<T, Param>, revaluatorParam),
		]
	);
}
