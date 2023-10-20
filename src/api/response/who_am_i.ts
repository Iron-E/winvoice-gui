import { isUser, type User } from "@/schema";

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::response::WhoAmI`}. */
export type WhoAmI = {
	user: User,
};

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of `WhoAmI`.
 */
export function isWhoAmI(json: unknown): json is WhoAmI {
	return json instanceof Object && 'user' in json && isUser(json.user);
}
