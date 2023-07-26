import { type Status } from "../status";

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::Get`}. */
export type Get<T> = {
	entities: T[],
	status: Status,
};
