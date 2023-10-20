import type { Organization } from "@/schema"
import { OrganizationForm } from '../organization';
import { MatchOrganizationForm } from "../match/organization";
import {
	type IdEventsHandler,
	type IdEventsHandlerNewForm,
	type IdEventsHandlerSearchForm,
	useIdEventHandlers,
} from "../field"

const NewForm: IdEventsHandlerNewForm<Organization> = props => <OrganizationForm {...props} id={`${props.id}--organization--new`} />;
const SearchForm: IdEventsHandlerSearchForm<Organization> = props => <MatchOrganizationForm {...props} id={`${props.id}--organization--search`} />;

/** Event handlers for a {@link Organization} ID. */
export const useOrganizationIdEventHandlers: IdEventsHandler<Organization> = (id, setOrganization) => useIdEventHandlers(id, setOrganization, NewForm, SearchForm);
