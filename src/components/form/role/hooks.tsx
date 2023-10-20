import type { Role } from "@/schema"
import { RoleForm } from '../role';
import { MatchRoleForm } from "../match/role";
import {
	type IdEventsHandler,
	type IdEventsHandlerNewForm,
	type IdEventsHandlerSearchForm,
	useIdEventHandlers,
} from "../field"

const NewForm: IdEventsHandlerNewForm<Role> = props => <RoleForm {...props} id={`${props.id}--role--new`} />;
const SearchForm: IdEventsHandlerSearchForm<Role> = props => <MatchRoleForm {...props} id={`${props.id}--role--search`} />;

/** Event handlers for a {@link Role} ID. */
export const useRoleIdEventHandlers: IdEventsHandler<Role> = (id, setRole) => useIdEventHandlers(id, setRole, NewForm, SearchForm);
