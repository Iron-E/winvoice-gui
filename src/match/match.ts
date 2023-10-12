import { type UnionToKeys } from '@/utils';

/** Same as {@link https://github.com/Iron-E/winvoice-match | `Match`}. */
export type Match<T = unknown> =
	| 'any'
	| NonNullable<T>
	| UnionToKeys<'and' | 'or', Match<T>[]>
	| UnionToKeys<`${'greater' | 'less'}_than`, NonNullable<T>>
	| { in_range: [NonNullable<T>, NonNullable<T>] }
	| { not: Match<T> }
	;
