import type { Job } from "@/schema"
import { JobForm } from '../job';
import { useIdEventHandlers } from "../field"

type JobIdEventHandlers = typeof useIdEventHandlers<Job>;

/** Event handlers for a {@link Job} ID. */
export function useJobIdEventHandlers(
	id: string,
	setJob: Parameters<JobIdEventHandlers>[0],
): ReturnType<JobIdEventHandlers> {
	return useIdEventHandlers(setJob, p => <JobForm { ...p } id = {`${id}--job--form`} />);
}
