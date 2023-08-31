import { isStatus, type Status } from '../status';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::response::Post`}. */
export type Post<T = unknown> = {
	entity?: T,
	status: Status,
};

/**
 * @param json the value to check.
 * @return whether the `json` is an instance of {@link Post}.
 */
export function isPost(json: unknown): json is Post {
	return json instanceof Object && (
		'status' in json && isStatus(json.status)
	);
}
