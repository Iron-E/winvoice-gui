import type { Job } from "@/schema"
import { JobForm } from '../job';
import { type IdEventsHandler, type IdEventsHandlerNewForm, useIdEventHandlers } from "../field"

export const Form: IdEventsHandlerNewForm<Job> = props => <JobForm {...props} id={`${props.id}--job--form`} />;

/** Event handlers for a {@link Job} ID. */
export const useJobIdEventHandlers: IdEventsHandler<Job> = (id, setJob) => useIdEventHandlers(id, setJob, Form);
