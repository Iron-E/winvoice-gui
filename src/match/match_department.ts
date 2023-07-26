import { type Id } from "../schema";
import { type Match } from "./match";
import { type MatchStr } from "./match_str";

/** Same as {@link https://github.com/Iron-E/winvoice-match | `MatchDepartment`}. */
export type MatchDepartment = {
	id?: Match<Id>,
	name?: MatchStr<string>,
};
