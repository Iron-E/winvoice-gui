import { Id } from "../schema";
import { type Match } from "./match";
import { type MatchEmployee } from "./match_employee";
import { type MatchExpense } from "./match_expense";
import { type MatchJob } from "./match_job";
import { type MatchSet } from "./match_set";
import { type MatchStr } from "./match_str";

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchTimesheet`}. */
export type MatchTimesheet = {
	employee?: MatchEmployee,
	expenses?: MatchSet<MatchExpense>,
	id?: Match<Id>,
	job?: MatchJob,
	time_begin?: Match<string>,
	time_end?: Match<string>,
	work_notes?: MatchStr<string>,
};
