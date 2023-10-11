import type { Organization } from "@/schema"
import { OrganizationForm } from '../organization';
import { type IdEventsHandler, type IdEventsHandlerForm, useIdEventHandlers } from "../field"

export const Form: IdEventsHandlerForm<Organization> = props => <OrganizationForm {...props} id={`${props.id}--organization--form`} />;

/** Event handlers for a {@link Organization} ID. */
export const useOrganizationIdEventHandlers: IdEventsHandler<Organization> = (id, setOrganization) => useIdEventHandlers(id, setOrganization, Form);
