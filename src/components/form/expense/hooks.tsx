import type { Expense } from "@/schema"
import { ExpenseForm } from '../expense';
import { type IdEventsHandler, type IdEventsHandlerForm, useIdEventHandlers } from "../field"

export const Form: IdEventsHandlerForm<Expense> = (props) => <ExpenseForm {...props} id={`${props.id}--expense--form`} />;

/** Event handlers for a {@link Expense} ID. */
export const useExpenseIdEventHandlers: IdEventsHandler<Expense> = (id, setExpense) => useIdEventHandlers(id, setExpense, Form);
