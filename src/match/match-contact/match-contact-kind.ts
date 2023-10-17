import type { MatchLocation } from '../match-location';
import type { MatchStr } from '../match-str';

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchContactKind`}. */
export type MatchContactKind =
	| { address: MatchLocation }
	| 'any'
	| { email: MatchStr }
	| { other: MatchStr }
	| { phone: MatchStr }
	;
