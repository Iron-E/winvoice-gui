import { type Status } from '../status';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::response::Get`}. */
export type Get<T = unknown> = {
	entities: T[],
	status: Status,
};
