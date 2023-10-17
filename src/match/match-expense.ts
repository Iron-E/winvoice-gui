import type { Id, Money } from '@/schema';
import type { Match } from './match';
import type { MatchStr } from './match-str';

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchExpense`}. */
export type MatchExpense = {
	category?: MatchStr,
	cost?: Match<Money>,
	description?: MatchStr,
	id?: Match<Id>,
	timesheet_id?: Match<Id>,
};
