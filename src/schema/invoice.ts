import { type InvoiceDate } from './invoice/invoice-date';
import { type Money } from './money';

export { type InvoiceDate };

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Invoice`} type. */
export type Invoice = {
	date?: InvoiceDate,
	hourly_rate: Money,
};
