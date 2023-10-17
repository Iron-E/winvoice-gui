import type { Id } from '@/schema';
import type { Match } from './match';
import type { MatchStr } from './match-str';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `MatchRole`}. */
export type MatchRole = {
	id?: Match<Id>,
	name?: MatchStr,
	password_ttl?: Match<string>,
};
