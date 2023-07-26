import { type MatchContactKind } from "./match_contact/match_contact_kind";
import { type MatchStr } from "./match_str";

export { type MatchContactKind };

/** Same as {@link https://github.com/Iron-E/winvoice-match | `Contact`}. */
export type MatchContact = {
	kind?: MatchContactKind,
	label?: MatchStr<string>,
};
