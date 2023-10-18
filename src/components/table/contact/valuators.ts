import type { Contact, Location } from '@/schema';
import type { Valuators } from '../order';
import type { ValueOf } from "@/utils";

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Location}
 */
export function contactValuators(keys: {
	address: keyof Location,
	outerAddress: keyof ValueOf<Location, 'outer'>,
}): Valuators<Contact> {
	return {
		address: {
			key: keys.address,
			valuators: {
				outer: {
					key: keys.outerAddress,
					valuators: { outer: { key: 'name' } },
				}
			}
		}
	};
}
