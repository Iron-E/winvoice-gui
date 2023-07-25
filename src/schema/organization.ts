import { type Id } from "./id";
import { type Location } from "./location";

/**
 * Same as {@link https://github.com/Iron-E/winvoice-schema | `Organization`} type.
 */
export type Organization = {
	id: Id,
	location: Location,
	name: string,
};
