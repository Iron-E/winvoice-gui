import { type Id } from '@/schema';
import { type Match } from './match';
import { type MatchLocation } from './match-location';
import { type MatchStr } from './match-str';

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchOrganization`}. */
export type MatchOrganization = {
	id?: Match<Id>,
	location?: MatchLocation,
	name?: MatchStr,
};
