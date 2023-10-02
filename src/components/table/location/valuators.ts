import type { Location } from '@/schema';
import type { Valuators } from "../order";

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Location}
 */
export function locationValuators(outerKey: keyof Location): Valuators<Location> {
	return {
		outer: {
			key: outerKey,
			valuators: { outer: { key: 'name' } },
		}
	};
}
