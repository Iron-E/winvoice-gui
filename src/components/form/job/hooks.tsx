import type { Job } from "@/schema"
import { JobForm } from '../job';
import { type IdEventsHandler, type IdEventsHandlerForm, useIdEventHandlers } from "../field"

export const Form: IdEventsHandlerForm<Job> = (props) => <JobForm {...props} id={`${props.id}--job--form`} />;

/** Event handlers for a {@link Job} ID. */
export const useJobIdEventHandlers: IdEventsHandler<Job> = (id, setJob) => useIdEventHandlers(id, setJob, Form);
