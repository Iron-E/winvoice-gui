import { Currency } from "./currency";
import { Id } from "./id";

/**
 * Same as {https://github.com/Iron-E/winvoice-schema | `Location`} type.
 */
export type Location = {
	currency?: Currency,
	id: Id,
	name: string,
	outer?: Location,
};
