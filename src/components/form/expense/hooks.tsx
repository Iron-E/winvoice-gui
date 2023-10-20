import type { Expense } from "@/schema"
import { ExpenseForm } from '../expense';
import { MatchExpenseForm } from "../match/expense";
import {
	type IdEventsHandler,
	type IdEventsHandlerNewForm,
	type IdEventsHandlerSearchForm,
	useIdEventHandlers,
} from "../field"

const NewForm: IdEventsHandlerNewForm<Expense> = props => <ExpenseForm {...props} id={`${props.id}--expense--new`} />;
const SearchForm: IdEventsHandlerSearchForm<Expense> = props => <MatchExpenseForm {...props} id={`${props.id}--expense--search`} />;

/** Event handlers for a {@link Expense} ID. */
export const useExpenseIdEventHandlers: IdEventsHandler<Expense> = (id, setExpense) => useIdEventHandlers(id, setExpense, NewForm, SearchForm);
