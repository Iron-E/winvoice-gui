import React from "react";
import type { Fn } from "@/utils";
import type { Order } from "../order";

/** The return type of {@link useOrder}. */
export type UseOrder<T> = [Order<keyof T>, Fn<[order: Order<keyof T>]>];

/**
 * @param defaultColumn the {@link Order.column | column} that is used to sort the data by default.
 * @returns {@link Order<T>} (w/ {@link Order.ascending | `ascending === false`}) as {@link React.useState | state}.
 */
export function useOrder<T>(defaultColumn: keyof T): UseOrder<T> {
	return React.useState<Order<keyof T>>({ ascending: false, column: defaultColumn });
}
