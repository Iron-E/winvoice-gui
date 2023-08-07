import { type UnionToKeys } from "../utils";

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchSet`}. */
export type MatchSet<T> =
	| 'any'
	| UnionToKeys<'and' | 'or', MatchSet<T>[]>
	| { contains: T }
	| { not: MatchSet<T> }
	;
