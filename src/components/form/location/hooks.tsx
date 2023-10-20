import type { Location } from "@/schema"
import { LocationForm } from '../location';
import { MatchLocationForm } from "../match/location";
import {
	type IdEventsHandler,
	type IdEventsHandlerNewForm,
	type IdEventsHandlerSearchForm,
	useIdEventHandlers,
} from "../field"

const NewForm: IdEventsHandlerNewForm<Location> = props => <LocationForm {...props} id={`${props.id}--location--new`} />;
const SearchForm: IdEventsHandlerSearchForm<Location> = props => <MatchLocationForm {...props} id={`${props.id}--location--search`} />;

/** Event handlers for a {@link Location} ID. */
export const useLocationIdEventHandlers: IdEventsHandler<Location> = (id, setLocation) => useIdEventHandlers(id, setLocation, NewForm, SearchForm);
