import { chainRevivers, dateReviver, fieldMaybeIs, optional } from "@/utils";

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `InvoiceDate`} type. */
export type InvoiceDate = {
	issued: Date,
	paid?: Date,
};

/** A reviver for {@link JSON.parse} on a {@link InvoiceDate}s. */
export const INVOICE_DATE_REVIVER = chainRevivers([
	dateReviver<InvoiceDate>('issued'),
	optional(dateReviver<InvoiceDate>('paid')),
]);

/**
 * @param date the {@link InvoiceDate} to convert into a `string`.
 * @returns the `date` as a `string`.
 */
export function invoiceDateToString(date: InvoiceDate): string {
	return `issued on ${date.issued.toLocaleString()}${date.paid ? `, paid on ${date.paid.toLocaleString()}` : ''}`;
}

/**
 * @param json the value to check.
 * @returns whether the `json` is an instance of {@link InvoiceDate}.
 */
export function isInvoiceDate(json: unknown): json is InvoiceDate {
	return json instanceof Object && (
		'issued' in json && json.issued instanceof Date
		&& fieldMaybeIs(json, 'paid', p => p instanceof Date)
	);
}
