import { type UnionToKeys } from '../utils';

/**
 * Common match fields.
 */
export type MatchCommon<T> =
	| 'any'
	| UnionToKeys<'and' | 'or', T[]>
	| { not: T }
	;
