import type { Timesheet } from "@/schema";
import { type UseOrder, useOrder } from "../order";

/** @returns {@link useOrder} specialized for a {@link Timesheet}. */
export function useTimesheetOrder(): UseOrder<Timesheet> {
	return useOrder('time_begin');
}
