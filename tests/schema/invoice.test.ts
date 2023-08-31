import { Currency, Invoice, InvoiceDate, Money, isInvoice, isInvoiceDate } from '@/schema';
import { testNarrowing } from './utils';

const INVOICE_DATE: Readonly<InvoiceDate> = { issued: new Date(), paid: new Date() };
const MONEY: Readonly<Money> = { amount: '20.00', currency: Currency.Usd };
const INVOICE: Readonly<Invoice> = { date: INVOICE_DATE, hourly_rate: MONEY };

describe('isInvoiceDate', () => {
	const [fields] = testNarrowing(isInvoiceDate);

	fields(INVOICE_DATE, [
		['issued', 'a'],
		['paid', 'a', true],
	]);
});

describe('isInvoice', () => {
	const [fields] = testNarrowing(isInvoice);

	fields(INVOICE, [
		['date', 'abc', true],
		['hourly_rate', 'abc'],
	]);
});
