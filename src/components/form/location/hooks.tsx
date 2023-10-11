import type { Location } from "@/schema"
import { LocationForm } from '../location';
import { type IdEventsHandler, type IdEventsHandlerForm, useIdEventHandlers } from "../field"

export const Form: IdEventsHandlerForm<Location> = props => <LocationForm {...props} id={`${props.id}--location--form`} />;

/** Event handlers for a {@link Location} ID. */
export const useLocationIdEventHandlers: IdEventsHandler<Location> = (id, setLocation) => useIdEventHandlers(id, setLocation, Form);
