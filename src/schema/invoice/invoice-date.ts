import { fieldMaybeIs } from "@/utils";

/** Same as {@link https://github.com/Iron-E/winvoice-schema | `InvoiceDate`} type. */
export type InvoiceDate = {
	issued: Date,
	paid?: Date,
};

/**
 * @param json the value to check.
 * @return whether the `json` is an instance of {@link InvoiceDate}.
 */
export function isInvoiceDate(json: unknown): json is InvoiceDate {
	return json instanceof Object && (
		'issued' in json && json.issued instanceof Date
		&& fieldMaybeIs(json, 'paid', p => p instanceof Date)
	);
}
