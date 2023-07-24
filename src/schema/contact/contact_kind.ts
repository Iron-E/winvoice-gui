import { Location } from "../location";

/**
 * Same as {@link https://github.com/Iron-E/winvoice-schema | `ContactKind`} type.
 */
export type ContactKind =
	| { address: Location }
	| { email: string }
	| { other: string }
	| { phone: string }
;
