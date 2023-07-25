import { type UnionToKeys } from 'utils/index';

/**
 * Same as {@link https://github.com/Iron-E/winvoice-match | `MatchOption`}.
 */
export type MatchOption<T> =
	| 'any'
	| 'none'
	| UnionToKeys<'none_or' | 'some', T>
	;
