import type { Expense } from "@/schema"
import { ExpenseForm } from '../expense';
import { useIdEventHandlers } from "../field"

type ExpenseIdEventHandlers = typeof useIdEventHandlers<Expense>;

/** Event handlers for a {@link Expense} ID. */
export function useExpenseIdEventHandlers(
	id: string,
	setExpense: Parameters<ExpenseIdEventHandlers>[0],
): ReturnType<ExpenseIdEventHandlers> {
	return useIdEventHandlers(setExpense, p => <ExpenseForm { ...p } id = {`${id}--expense--form`} />);
}
