import { Currency } from "./currency";
import { type Id } from "./id";

/**
 * Same as {@link https://github.com/Iron-E/winvoice-schema | `Location`} type.
 */
export type Location = {
	currency?: Currency,
	id: Id,
	name: string,
	outer?: Location,
};
