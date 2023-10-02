import type { Location, Organization } from "@/schema";
import type { Valuators } from "../order";


/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Organization}
 */
export function organizationValuators(keys: {
	location: keyof Location,
	outerLocation: keyof Location,
}): Valuators<Organization> {
	return {
		location: {
			key: keys.location,
			valuators: { outer: { key: keys.outerLocation } },
		},
	};
}
