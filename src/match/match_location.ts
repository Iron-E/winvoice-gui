import { Currency, type Id } from '../schema';
import { type Match } from "./match";
import { type MatchOption } from "./match_option";
import { type MatchStr } from './match_str';

/**
 * Same as {@link https://github.com/Iron-E/winvoice-match | `MatchLocation`}.
 */
export type MatchLocation = {
	currency?: MatchOption<Match<Currency>>,
	id?: Match<Id>,
	name?: MatchStr<string>,
	outer?: MatchOption<MatchLocation>,
};
