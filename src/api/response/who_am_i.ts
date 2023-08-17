/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::response::WhoAmI`}. */
export type WhoAmI = {
	username: string,
};

/**
 * @param json the value to check.
 * @return whether the `json` is an instance of `WhoAmI`.
 */
export function isWhoAmI(json: unknown): json is WhoAmI {
	return json instanceof Object && 'username' in json;
}
