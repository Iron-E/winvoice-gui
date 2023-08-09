import { type MatchContactKind } from './match-contact/match-contact-kind';
import { type MatchStr } from './match-str';

export { type MatchContactKind };

/** Same as {@link https://github.com/Iron-E/winvoice-match | `Contact`}. */
export type MatchContact = {
	kind?: MatchContactKind,
	label?: MatchStr<string>,
};
