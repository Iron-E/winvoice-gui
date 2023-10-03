import type { Expense } from "@/schema";
import { type UseOrder, useOrder } from "../order";

/** @returns {@link useOrder} specialized for a {@link Expense}. */
export function useExpenseOrder(): UseOrder<Expense> {
	return useOrder('category');
}
