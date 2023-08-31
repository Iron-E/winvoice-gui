import { fieldMaybeIs } from '@/utils';
import { isInvoiceDate, type InvoiceDate } from './invoice/invoice-date';
import { isMoney, type Money } from './money';

export { type InvoiceDate };

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `Invoice`} type. */
export type Invoice = {
	date?: InvoiceDate,
	hourly_rate: Money,
};

/**
 * @param json the value to check.
 * @return whether the `json` is an instance of {@link Invoice}.
 */
export function isInvoice(json: unknown): json is Invoice {
	return json instanceof Object && (
		fieldMaybeIs(json, 'date', isInvoiceDate)
		&& 'hourly_rate' in json && isMoney(json.hourly_rate)
	);
}
