import type { Department, Invoice, InvoiceDate, Job, Location, Organization } from "@/schema";
import type { Valuators } from "../order";
import { invoiceValuators, organizationValuators } from "../../table";

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Job}
 */
export function jobValuators(keys: {
	client: keyof Organization,
	clientLocation: keyof Location,
	clientOuterLocation: keyof Location,
	departments: keyof Department,
	invoice: keyof Invoice,
	invoiceDate: keyof InvoiceDate,
}): Valuators<Job> {
	return {
		client: {
			key: keys.client,
			valuators: organizationValuators({
				location: keys.clientLocation,
				outerLocation: keys.clientOuterLocation,
			}),
		},
		departments: { key: keys.departments },
		invoice: {
			key: keys.invoice,
			valuators: invoiceValuators(keys.invoiceDate),
		},
	};
}
