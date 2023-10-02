import type { Valuators } from "../order";
import { type Invoice, type InvoiceDate, moneyToString } from "@/schema";


/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Invoice}
 */
export function invoiceValuators(dateKey: keyof InvoiceDate): Valuators<Invoice> {
	return {
		date: { key: dateKey },
		hourly_rate: { map: moneyToString },
	};
}
