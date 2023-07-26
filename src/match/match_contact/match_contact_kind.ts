import { type MatchLocation } from '../match_location';
import { type MatchStr } from '../match_str';

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchContactKind`}. */
export type MatchContactKind =
	| {address: MatchLocation}
	| 'any'
	| {email: MatchStr<string>}
	| {other: MatchStr<string>}
	| {phone: MatchStr<string>}
	;
