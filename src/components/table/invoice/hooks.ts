import type { Invoice, InvoiceDate } from "@/schema";
import { type UseOrder, useOrder } from "../order";

/** @returns {@link useOrder} specialized for a {@link Invoice}. */
export function useInvoiceDateOrder(): UseOrder<InvoiceDate> {
	return useOrder('issued');
}

/** @returns {@link useOrder} specialized for a {@link Invoice}. */
export function useInvoiceOrder(): UseOrder<Invoice> {
	return useOrder('date');
}
