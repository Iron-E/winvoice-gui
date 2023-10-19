import type { Timesheet } from "@/schema"
import { TimesheetForm } from '../timesheet';
import { MatchTimesheetForm } from "../match/timesheet";
import {
	type IdEventsHandler,
	type IdEventsHandlerNewForm,
	type IdEventsHandlerSearchForm,
	useIdEventHandlers,
} from "../field"

export const NewForm: IdEventsHandlerNewForm<Timesheet> = props => <TimesheetForm {...props} id={`${props.id}--timesheet--new`} />;
export const SearchForm: IdEventsHandlerSearchForm<Timesheet> = props => <MatchTimesheetForm {...props} id={`${props.id}--timesheet--search`} />;

/** Event handlers for a {@link Timesheet} ID. */
export const useTimesheetIdEventHandlers: IdEventsHandler<Timesheet> = (id, setTimesheet) => useIdEventHandlers(id, setTimesheet, NewForm, SearchForm);
