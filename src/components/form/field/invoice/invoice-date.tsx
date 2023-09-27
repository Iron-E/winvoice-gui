'use client';

import React from 'react';
import type { CompositeProps } from '../props';
import type { InvoiceDate } from '@/schema';
import { InputDate } from '../../field';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link InvoiceDate} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputInvoiceDate(props: CompositeProps<InvoiceDate>): React.ReactElement {
	const [ISSUED, setIssued] = React.useState(props.value?.issued);
	const [PAID, setPaid] = React.useState(props.value?.paid);

	return <>
		<InputDate
			id={`${props.id}--issued`}
			label={`${props.label} Issued`}
			onChange={issued => {
				setIssued(issued);
				props.onChange({ issued, paid: PAID });
			}}
			required={PAID != undefined}
			title='The date that the invoice was issued'
			value={ISSUED}
		/>

		<InputDate
			id={`${props.id}--paid`}
			label={`${props.label} Paid`}
			onChange={paid => {
				setPaid(paid);
				if (ISSUED != undefined) {
					props.onChange({ issued: ISSUED, paid });
				}
			}}
			title='The date that the invoice was paid'
			value={PAID}
		/>
	</>;
}
