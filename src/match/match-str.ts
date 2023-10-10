import type { UnionToKeys } from '@/utils';

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchStr`}. */
export type MatchStr =
	| 'any'
	| string
	| UnionToKeys<'and' | 'or', MatchStr[]>
	| UnionToKeys<'contains' | 'regex', string>
	| { not: MatchStr }
	;
