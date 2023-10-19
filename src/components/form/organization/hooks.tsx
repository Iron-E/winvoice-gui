import type { Organization } from "@/schema"
import { OrganizationForm } from '../organization';
import { type IdEventsHandler, type IdEventsHandlerNewForm, useIdEventHandlers } from "../field"

export const Form: IdEventsHandlerNewForm<Organization> = props => <OrganizationForm {...props} id={`${props.id}--organization--form`} />;

/** Event handlers for a {@link Organization} ID. */
export const useOrganizationIdEventHandlers: IdEventsHandler<Organization> = (id, setOrganization) => useIdEventHandlers(id, setOrganization, Form);
