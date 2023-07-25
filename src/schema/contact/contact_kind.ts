import { type Location } from '../location';
import { type UnionToKeys } from 'utils/index';

/**
 * Same as {@link https://github.com/Iron-E/winvoice-schema | `ContactKind`} type.
 */
export type ContactKind =
	| { address: Location }
	| UnionToKeys<'email' | 'other' | 'phone', string>
	;
