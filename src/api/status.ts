import { Code, isCode } from './status/code';

export { Code, isCode };

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::Status`}. */
export type Status = Readonly<{
	code: Code,
	message: string,
}>;

/**
 * @param json the value to check.
 * @return whether the `json` is an instance of {@link Status}.
 */
export function isStatus(json: unknown): json is Status {
	return json instanceof Object && (
		'code' in json && isCode(json.code)
		&& 'message' in json && typeof json.message === 'string'
	);
}
