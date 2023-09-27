'use client';

import React from 'react';
import type { BaseProps } from './props';
import type { Invoice, InvoiceDate, Money } from '@/schema';
import type { On } from '@/components/props-with';
import { InvoiceDateForm } from './invoice/invoice-date';

export { InvoiceDateForm };

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link InvoiceDate} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InvoiceForm(props:
	& Omit<BaseProps<Invoice>, 'onSubmit'>
	& Required<On<'change', [invoice: Invoice]>>
): React.ReactElement {
	const [DATE, setDate] = React.useState<InvoiceDate>();
	const [HOURLY_RATE, setHourlyRate] = React.useState<Money>();

	return <>
		<InvoiceDateForm
			id={`${props.id}--invoice--date`}
			onChange={setDate}
		/>
	</>;
}
