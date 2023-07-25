import { type MatchCommon } from './match_common';

type Base<T> = { contains: T };

/**
 * Same as {@link https://github.com/Iron-E/winvoice-match | `MatchSet`}.
 */
export type MatchSet<T> = Base<T> | MatchCommon<Base<T>>;
