import { UnionToKeys } from 'utils/union_to_keys';

/**
 * Same as {@link https://github.com/Iron-E/winvoice-match | `Match`}.
 */
export type Match<T> =
	| "any"
	| T
	| UnionToKeys<'and' | 'or', Match<T>[]>
	| UnionToKeys<`${'greater' | 'less'}_than`, T>
	| { in_range: [T, T] }
	| { not: Match<T> }
	;

// TODO: finish this file
