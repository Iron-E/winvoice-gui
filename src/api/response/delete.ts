import { type Status } from '../status';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::response::Delete`}. */
export type Delete = {
	status: Status,
};

/**
 * @param json the value to check.
 * @return whether the `json` is an instance of {@link Delete}.
 */
export function isDelete(json: unknown): json is Delete {
	return json instanceof Object && 'status' in json;
}
