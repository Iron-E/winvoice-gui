import type { Job } from "@/schema"
import { JobForm } from '../job';
import { MatchJobForm } from "../match/job";
import {
	type IdEventsHandler,
	type IdEventsHandlerNewForm,
	type IdEventsHandlerSearchForm,
	useIdEventHandlers,
} from "../field"

export const NewForm: IdEventsHandlerNewForm<Job> = props => <JobForm {...props} id={`${props.id}--job--new`} />;
export const SearchForm: IdEventsHandlerSearchForm<Job> = props => <MatchJobForm {...props} id={`${props.id}--job--search`} />;

/** Event handlers for a {@link Job} ID. */
export const useJobIdEventHandlers: IdEventsHandler<Job> = (id, setJob) => useIdEventHandlers(id, setJob, NewForm, SearchForm);
