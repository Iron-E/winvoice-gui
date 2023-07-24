/**
 * Same as {@link https://github.com/Iron-E/winvoice-schema | `InvoiceDate`} type.
 */
export type InvoiceDate = {
	issued: Date,
	paid?: Date,
};
