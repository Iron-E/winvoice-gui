import { isStatus, type Status } from '../status';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::response::Post`}. */
export type Put<T = unknown> = {
	entity?: T,
	status: Status,
};

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link Put}.
 */
export function isPut(json: unknown): json is Put {
	return json instanceof Object && (
		'status' in json && isStatus(json.status)
	);
}
