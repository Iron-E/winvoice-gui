import type { Employee } from "@/schema"
import { EmployeeForm } from '../employee';
import { MatchEmployeeForm } from "../match/employee";
import {
	type IdEventsHandler,
	type IdEventsHandlerNewForm,
	type IdEventsHandlerSearchForm,
	useIdEventHandlers,
} from "../field"

export const NewForm: IdEventsHandlerNewForm<Employee> = props => <EmployeeForm {...props} id={`${props.id}--employee--new`} />;
export const SearchForm: IdEventsHandlerSearchForm<Employee> = props => <MatchEmployeeForm {...props} id={`${props.id}--employee--search`} />;

/** Event handlers for a {@link Employee} ID. */
export const useEmployeeIdEventHandlers: IdEventsHandler<Employee> = (id, setEmployee) => useIdEventHandlers(id, setEmployee, NewForm, SearchForm);
