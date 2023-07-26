import { type Id } from "../schema";
import { type Match } from "./match";
import { type MatchDepartment } from "./match_department";
import { type MatchStr } from "./match_str";

/**
 * Same as {@link https://github.com/Iron-E/winvoice-match | `MatchEmployee`}.
 */
export type MatchEmployee = {
	active?: Match<boolean>,
	department?: MatchDepartment,
	id?: Match<Id>,
	name?: MatchStr<string>,
	title?: MatchStr<string>,
};
