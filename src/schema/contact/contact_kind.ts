import { Location } from '../location';
import { UnionToKeys } from 'utils/union_to_keys';

/**
 * Same as {@link https://github.com/Iron-E/winvoice-schema | `ContactKind`} type.
 */
export type ContactKind =
	| { address: Location }
	| UnionToKeys<'email' | 'other' | 'phone', string>
	;
