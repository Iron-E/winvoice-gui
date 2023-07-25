import { type UnionToKeys } from 'utils/index';

/**
 * Common match fields.
 */
export type MatchCommon<T> =
	| 'any'
	| UnionToKeys<'and' | 'or', T[]>
	| { not: T }
	;
