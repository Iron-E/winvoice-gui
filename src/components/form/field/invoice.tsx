'use client';

import React from 'react';
import type { CompositeProps } from './props';
import type { Invoice, InvoiceDate, Money } from '@/schema';
import { InputInvoiceDate } from './invoice/invoice-date';
import { InputMoney } from './money';

export { InputInvoiceDate };

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link InvoiceDate} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputInvoice(props: CompositeProps<Invoice>): React.ReactElement {
	const [DATE, setDate] = React.useState<InvoiceDate>();
	const [HOURLY_RATE, setHourlyRate] = React.useState<Money>();

	return <>
		<InputInvoiceDate
			id={`${props.id}--invoice--date`}
			onChange={setDate}
			value={DATE}
		/>

		<InputMoney
			id={`${props.id}--invoice--hourly-rate`}
			onChange={setHourlyRate}
			value={HOURLY_RATE}
		/>
	</>;
}
