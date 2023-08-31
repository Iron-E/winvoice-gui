import { isId, type Id } from './id';
import { isLocation, type Location } from './location';

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Organization`} type. */
export type Organization = {
	id: Id,
	location: Location,
	name: string,
};

/**
 * @param json the value to check.
 * @return whether the `json` is an instance of {@link Organization}.
 */
export function isOrganization(json: unknown): json is Organization {
	return json instanceof Object && (
		'id' in json && isId(json.id)
		&& 'location' in json && isLocation(json.location)
		&& 'name' in json && typeof json.name === 'string'
	);
}
