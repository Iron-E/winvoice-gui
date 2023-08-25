import { type Id } from './id';

/** Same as {@link https://github.com/Iron-E/winvoice-server | `Role`} type. */
export type Role = {
	id: Id,
	name: string,
	password_ttl?: string,
};
