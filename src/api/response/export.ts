import { isStatus, type Status } from '../status';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::response::Export`}. */
export type Export = {
	exported: Record<string, string>,
	status: Status,
};

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link Export}.
 */
export function isExport(json: unknown): json is Export {
	return json instanceof Object && (
		'exported' in json && json.exported instanceof Object
		&& 'status' in json && isStatus(json.status)
	);
}
