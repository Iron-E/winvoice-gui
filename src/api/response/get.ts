import { isStatus, type Status } from '../status';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::response::Get`}. */
export type Get<T = unknown> = {
	entities: T[],
	status: Status,
};

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link Get}.
 */
export function isGet(json: unknown): json is Get {
	return json instanceof Object && (
		'entities' in json && json.entities instanceof Array
		&& 'status' in json && isStatus(json.status)
	);
}
