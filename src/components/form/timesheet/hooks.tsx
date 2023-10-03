import type { Timesheet } from "@/schema"
import { TimesheetForm } from '../timesheet';
import { useIdEventHandlers } from "../field"

type TimesheetIdEventHandlers = typeof useIdEventHandlers<Timesheet>;

/** Event handlers for a {@link Timesheet} ID. */
export function useTimesheetIdEventHandlers(
	id: string,
	setTimesheet: Parameters<TimesheetIdEventHandlers>[0],
): ReturnType<TimesheetIdEventHandlers> {
	return useIdEventHandlers(setTimesheet, p => <TimesheetForm { ...p } id = {`${id}--timesheet--form`} />);
}
