import type { Id, Money } from "../schema";
import { Match } from "./match";
import { MatchStr } from "./match_str";

/**
 * Same as {@link https://github.com/Iron-E/winvoice-match | `MatchExpense`}.
 */
export type MatchExpense = {
	category?: MatchStr<string>,
	cost?: Match<Money>,
	description?: MatchStr<string>,
	id?: Match<Id>,
	timesheet_id?: Match<Id>,
};
