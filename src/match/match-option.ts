import type { UnionToKeys } from '@/utils';

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchOption`}. */
export type MatchOption<T = unknown> =
	| 'any'
	| 'none'
	| UnionToKeys<'none_or' | 'some', T>
	;
