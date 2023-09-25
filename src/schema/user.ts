import { fieldMaybeIs } from '@/utils';
import { isEmployee, type Employee } from './employee';
import { isId, type Id } from './id';
import { isRole, type Role } from './role';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `User`} type. */
export type User = {
	employee?: Employee,
	id: Id,
	password: string,
	password_set: Date,
	role: Role,
	username: string,
};

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link User}.
 */
export function isUser(json: unknown): json is User {
	return json instanceof Object && (
		fieldMaybeIs(json, 'employee', isEmployee)
		&& 'id' in json && isId(json.id)
		&& 'password' in json && typeof json.password === 'string'
		&& 'password_set' in json && json.password_set instanceof Date
		&& 'role' in json && isRole(json.role)
		&& 'username' in json && typeof json.username === 'string'
	);
}
