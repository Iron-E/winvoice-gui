import { type Money } from "../schema";
import { type Match } from "./match";
import { type MatchOption } from "./match-option";

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchInvoice`}. */
export type MatchInvoice = {
	/** If present, should be valid input to {@link Date.parse} */
	date_issued?: MatchOption<Match<string>>,
	/** If present, should be valid input to {@link Date.parse} */
	date_paid?: MatchOption<Match<string>>,
	hourly_rate?: Match<Money>,
};
