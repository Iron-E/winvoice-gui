import { Id } from '@/schema';
import { type Match } from './match';
import { type MatchEmployee } from './match-employee';
import { type MatchExpense } from './match-expense';
import { type MatchJob } from './match-job';
import { type MatchSet } from './match-set';
import { type MatchStr } from './match-str';

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchTimesheet`}. */
export type MatchTimesheet = {
	employee?: MatchEmployee,
	expenses?: MatchSet<MatchExpense>,
	id?: Match<Id>,
	job?: MatchJob,
	time_begin?: Match<string>,
	time_end?: Match<string>,
	work_notes?: MatchStr,
};
