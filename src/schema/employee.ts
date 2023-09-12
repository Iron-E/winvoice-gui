import { isDepartment, type Department } from './department';
import { isId, type Id } from './id';

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Employee`} type. */
export type Employee = {
	active: boolean,
	department: Department,
	id: Id,
	name: string,
	title: string,
};

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link Employee}.
 */
export function isEmployee(json: unknown): json is Employee {
	return json instanceof Object && (
		'active' in json && typeof json.active === 'boolean'
		&& 'department' in json && isDepartment(json.department)
		&& 'id' in json && isId(json.id)
		&& 'name' in json && typeof json.name === 'string'
		&& 'title' in json && typeof json.title === 'string'
	);
}
