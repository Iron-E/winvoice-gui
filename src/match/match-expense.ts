import type { Id, Money } from "../schema";
import { type Match } from "./match";
import { type MatchStr } from "./match-str";

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchExpense`}. */
export type MatchExpense = {
	category?: MatchStr<string>,
	cost?: Match<Money>,
	description?: MatchStr<string>,
	id?: Match<Id>,
	timesheet_id?: Match<Id>,
};
