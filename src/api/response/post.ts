import { type Status } from '../status';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::response::Post`}. */
export type Post<T = unknown> = {
	entity?: T,
	status: Status,
};
