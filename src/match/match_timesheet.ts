import { Id } from "../schema";
import { Match } from "./match";
import { MatchEmployee } from "./match_employee";
import { MatchExpense } from "./match_expense";
import { MatchJob } from "./match_job";
import { MatchSet } from "./match_set";
import { MatchStr } from "./match_str";

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
