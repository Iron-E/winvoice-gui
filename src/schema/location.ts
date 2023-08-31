import { Currency, isCurrency } from './currency';
import { isId, type Id } from './id';

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Location`} type. */
export type Location = {
	currency?: Currency,
	id: Id,
	name: string,
	outer?: Location,
};

/**
 * @param json the value to check.
 * @return whether the `json` is an instance of {@link Location}.
 */
export function isLocation(json: unknown): json is Location {
	return json instanceof Object && (
		(('currency' in json && isCurrency(json.currency)) || !('currency' in json))
		&& 'id' in json
		&& isId(json.id)
		&& 'name' in json
		&& typeof json.name === 'string'
		&& (('outer' in json && isLocation(json.outer)) || !('outer' in json))
	);
}
