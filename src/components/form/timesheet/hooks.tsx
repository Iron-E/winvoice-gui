import type { Timesheet } from "@/schema"
import { TimesheetForm } from '../timesheet';
import { type IdEventsHandler, type IdEventsHandlerNewForm, useIdEventHandlers } from "../field"

export const Form: IdEventsHandlerNewForm<Timesheet> = props => <TimesheetForm {...props} id={`${props.id}--timesheet--form`} />;

/** Event handlers for a {@link Timesheet} ID. */
export const useTimesheetIdEventHandlers: IdEventsHandler<Timesheet> = (id, setTimesheet) => useIdEventHandlers(id, setTimesheet, Form);
