import { isId, type Id } from './id';

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Department`} type. */
export type Department = {
	id: Id,
	name: string,
};

/**
 * @param json the value to check.
 * @return whether the `json` is an instance of {@link Department}.
 */
export function isDepartment(json: unknown): json is Department {
	return json instanceof Object && (
		'id' in json && isId(json.id)
		&& 'name' in json && typeof json.name === 'string'
	);
}
