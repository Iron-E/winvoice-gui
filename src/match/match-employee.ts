import type { Id } from '@/schema';
import type { Match } from './match';
import type { MatchDepartment } from './match-department';
import type { MatchStr } from './match-str';

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchEmployee`}. */
export type MatchEmployee = {
	active?: Match<boolean>,
	department?: MatchDepartment,
	id?: Match<Id>,
	name?: MatchStr,
	title?: MatchStr,
};
