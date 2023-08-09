import { type UnionToKeys } from '../utils';

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchStr`}. */
export type MatchStr<T = unknown> =
	| 'any'
	| T
	| UnionToKeys<'and' | 'or', MatchStr<T>[]>
	| UnionToKeys<'contains' | 'regex', T>
	| { not: MatchStr<T> }
	;
