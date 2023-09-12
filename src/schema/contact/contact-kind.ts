import { type Location, isLocation } from '../location';
import { type UnionToKeys } from '@/utils';

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `ContactKind`} type. */
export type ContactKind =
	| { address: Location }
	| UnionToKeys<'email' | 'other' | 'phone', string>
	;

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link ContactKind}.
 */
export function isContactKind(json: unknown): json is ContactKind {
	return json instanceof Object && (
		('address' in json && isLocation(json.address))
		|| ('email' in json && typeof json.email === 'string')
		|| ('other' in json && typeof json.other === 'string')
		|| ('phone' in json && typeof json.phone === 'string')
	)
}
