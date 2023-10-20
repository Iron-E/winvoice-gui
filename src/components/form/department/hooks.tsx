import type { Department } from "@/schema"
import { DepartmentForm } from '../department';
import { MatchDepartmentForm } from "../match/department";
import {
	type IdEventsHandler,
	type IdEventsHandlerNewForm,
	type IdEventsHandlerSearchForm,
	useIdEventHandlers,
} from "../field"

const NewForm: IdEventsHandlerNewForm<Department> = props => <DepartmentForm {...props} id={`${props.id}--departrment--new`} />;
const SearchForm: IdEventsHandlerSearchForm<Department> = props => <MatchDepartmentForm {...props} id={`${props.id}--departrment--search`} />;

/** Event handlers for a {@link Department} ID. */
export const useDepartmentIdEventHandlers: IdEventsHandler<Department> = (id, setDepartment) => useIdEventHandlers(id, setDepartment, NewForm, SearchForm);
