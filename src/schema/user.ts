import { type Employee } from './employee';
import { type Id } from './id';
import { type Role } from './role';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `User`} type. */
export type User = {
	employee?: Employee,
	id: Id,
	password: string,
	password_expires?: Date,
	role: Role,
	username: string,
};
