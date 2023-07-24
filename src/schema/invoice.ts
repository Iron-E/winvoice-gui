import { InvoiceDate } from "./invoice/invoice_date";
import { Money } from "./money";

/**
 * Same as {https://github.com/Iron-E/winvoice-schema | `Invoice`} type.
 */
export type Invoice = {
	date?: InvoiceDate,
	hourly_rate: Money,
};
