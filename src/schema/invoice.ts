import { fieldMaybeIs } from '@/utils';
import { isInvoiceDate, type InvoiceDate, invoiceDateToString } from './invoice/invoice-date';
import { isMoney, moneyToString, type Money } from './money';

export { isInvoiceDate, type InvoiceDate };

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Invoice`} type. */
export type Invoice = {
	date?: InvoiceDate,
	hourly_rate: Money,
};

/**
 * @param invoice the {@link Invoice} to convert to a string.
 * @returns the `money` as a `string`.
 */
export function invoiceToString(invoice: Invoice): string {
	return `Invoice with rate ${moneyToString(invoice.hourly_rate)} \
${invoice.date ? invoiceDateToString(invoice.date) : ''}`.trimEnd();
}

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link Invoice}.
 */
export function isInvoice(json: unknown): json is Invoice {
	return json instanceof Object && (
		fieldMaybeIs(json, 'date', isInvoiceDate)
		&& 'hourly_rate' in json && isMoney(json.hourly_rate)
	);
}
