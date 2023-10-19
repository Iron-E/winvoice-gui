import type { Location } from "@/schema"
import { LocationForm } from '../location';
import { type IdEventsHandler, type IdEventsHandlerNewForm, useIdEventHandlers } from "../field"

export const Form: IdEventsHandlerNewForm<Location> = props => <LocationForm {...props} id={`${props.id}--location--form`} />;

/** Event handlers for a {@link Location} ID. */
export const useLocationIdEventHandlers: IdEventsHandler<Location> = (id, setLocation) => useIdEventHandlers(id, setLocation, Form);
