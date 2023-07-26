import { type Status } from "../status";

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::response::Export`}. */
export type Export = {
	exported: Map<string, string>,
	status: Status,
};
