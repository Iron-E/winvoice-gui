import { type MatchCommon } from './match_common';
import { type UnionToKeys } from '../utils';

type Base<T> =
	| T
	| UnionToKeys<'contains' | 'regex', T>
	;

/**
 * Same as {@link https://github.com/Iron-E/winvoice-match | `MatchStr`}.
 */
export type MatchStr<T> = Base<T> | MatchCommon<Base<T>>;
