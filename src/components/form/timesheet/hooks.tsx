import type { Timesheet } from "@/schema"
import { TimesheetForm } from '../timesheet';
import { type IdEventsHandler, type IdEventsHandlerForm, useIdEventHandlers } from "../field"

export const Form: IdEventsHandlerForm<Timesheet> = props => <TimesheetForm {...props} id={`${props.id}--timesheet--form`} />;

/** Event handlers for a {@link Timesheet} ID. */
export const useTimesheetIdEventHandlers: IdEventsHandler<Timesheet> = (id, setTimesheet) => useIdEventHandlers(id, setTimesheet, Form);
