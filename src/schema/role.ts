import { fieldMaybeIs } from '@/utils';
import { isId, type Id } from './id';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `Role`} type. */
export type Role = {
	id: Id,
	name: string,
	password_ttl?: string,
};

/**
 * @param json the value to check.
 * @return whether the `json` is an instance of {@link Role}.
 */
export function isRole(json: unknown): json is Role {
	return json instanceof Object && (
		'id' in json && isId(json.id)
		&& 'name' in json && typeof json.name === 'string'
		&& fieldMaybeIs(json, 'password_ttl', p => typeof p === 'string')
	);
}
