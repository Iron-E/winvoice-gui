import type { Expense } from "@/schema";
import { EXPENSE_VALUATORS } from "./valuators";
import { ExpenseTable } from "../expense";
import { type UseOrder, type UseTable, useOrder, useOrderedData } from "../order";

const COLUMN = 'category' as const;

/** @returns {@link useOrder} specialized for a {@link Expense}. */
export function useExpenseOrder(): UseOrder<Expense> {
	return useOrder(COLUMN);
}

export const useExpenseTable: UseTable<Expense> = handler => {
	const ORDERED_DATA = useOrderedData<Expense>(COLUMN, EXPENSE_VALUATORS);
	return [ORDERED_DATA, ORDERED_DATA.data.length < 1 ? undefined : (
		<ExpenseTable onRowSelect={handler} orderedData={ORDERED_DATA} />
	)];
}
