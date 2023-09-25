import { type Id } from '@/schema';
import { type Match } from './match';
import { type MatchEmployee } from './match-employee';
import { type MatchOption } from './match-option';
import { type MatchRole } from './match-role';
import { type MatchStr } from './match-str';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `MatchUser`} type. */
export type MatchUser = {
	employee: MatchOption<MatchEmployee>,
	id: Match<Id>,
	password: MatchStr<string>,
	password_set: MatchOption<Match<Date>>,
	role: MatchRole,
	username: string,
};
