import { type MatchCommon } from './match_common';
import { type UnionToKeys } from '../utils';

type Base<T> =
	| T
	| UnionToKeys<`${'greater' | 'less'}_than`, T>
	| { in_range: [T, T] }
	;

/**
 * Same as {@link https://github.com/Iron-E/winvoice-match | `Match`}.
 */
export type Match<T> = Base<T> | MatchCommon<Base<T>>;
