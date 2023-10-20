import { isUser, type User } from '@/schema';
import { isStatus, type Status } from '../status';
import { fieldMaybeIs } from '@/utils';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `api::response::Login`}. */
export type Login = {
	status: Status,
	user?: User,
};

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link Put}.
 */
export function isLogin(json: unknown): json is Login {
	return json instanceof Object && (
		'status' in json && isStatus(json.status)
		&& fieldMaybeIs(json, 'user', isUser)
	);
}
