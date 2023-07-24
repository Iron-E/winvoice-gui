import { Id } from "./id";
import { Location } from "./location";

/**
 * Same as {https://github.com/Iron-E/winvoice-schema | `Organization`} type.
 */
export type Organization = {
	id: Id,
	location: Location,
	name: string,
};
