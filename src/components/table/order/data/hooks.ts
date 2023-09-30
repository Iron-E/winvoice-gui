import React from "react";
import type { NonNullUnit } from "@/utils";
import type { Valuators } from "../valuators";
import { OrderedData } from "../data";
import { useOrder } from "../hooks";

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
