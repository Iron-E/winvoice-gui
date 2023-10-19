import type { Role } from "@/schema"
import { RoleForm } from '../role';
import { type IdEventsHandler, type IdEventsHandlerNewForm, useIdEventHandlers } from "../field"

export const Form: IdEventsHandlerNewForm<Role> = props => <RoleForm {...props} id={`${props.id}--role--form`} />;

/** Event handlers for a {@link Role} ID. */
export const useRoleIdEventHandlers: IdEventsHandler<Role> = (id, setRole) => useIdEventHandlers(id, setRole, Form);
