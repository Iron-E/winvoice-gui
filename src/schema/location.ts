import { Currency } from './currency';
import { type Id } from './id';

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Location`} type. */
export type Location = {
	currency?: Currency,
	id: Id,
	name: string,
	outer?: Location,
};

export function isLocation(json: unknown): json is Location {
	return json instanceof Object && 'id' in json && 'name' in json;
}
