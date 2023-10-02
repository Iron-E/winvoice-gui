'use client';

import React from 'react';
import type { CompositeProps } from './props';
import type { Invoice, InvoiceDate } from '@/schema';
import { BorderLabeledField } from './border-labeled';
import { InputDate } from '../field';
import { InputMoney } from './money';

const VALIDATE_ICON_TOP = 'top-0'
const VALIDATE_ICON_RIGHT = 'right-9'

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link InvoiceDate} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputInvoice(props: CompositeProps<Invoice>): React.ReactElement {
	const [HOURLY_RATE, setHourlyRate] = React.useState(props.value?.hourly_rate);
	const [ISSUED, setIssued] = React.useState(props.value?.date?.issued);
	const [PAID, setPaid] = React.useState(props.value?.date?.paid);

	return (
		<BorderLabeledField className='w-full' label={props.label}>
			<div className='mb-1'>
				<InputDate
					id={`${props.id}--date--issued`}
					label={`${props.label} Date Issued`}
					onChange={issued => {
						setIssued(issued);
						if (HOURLY_RATE != undefined) {
							props.onChange({ date: { issued, paid: PAID }, hourly_rate: HOURLY_RATE });
						}
					}}
					required={PAID != undefined}
					title='The date that the invoice was issued'
					validateIconRight={VALIDATE_ICON_RIGHT}
					validateIconTop={VALIDATE_ICON_TOP}
					value={ISSUED}
				/>
			</div>

			<div>
				<InputDate
					id={`${props.id}--date--paid`}
					label={`${props.label} Date Paid`}
					onChange={paid => {
						setPaid(paid);
						if (!(HOURLY_RATE == undefined || ISSUED == undefined)) {
							props.onChange({ date: { issued: ISSUED, paid }, hourly_rate: HOURLY_RATE });
						}
					}}
					title='The date that the invoice was paid'
					validateIconRight={VALIDATE_ICON_RIGHT}
					validateIconTop={VALIDATE_ICON_TOP}
					value={PAID}
				/>
			</div>

			<InputMoney
				id={`${props.id}--invoice--hourly-rate`}
				label='Hourly Rate'
				onChange={hourly_rate => {
					setHourlyRate(hourly_rate);
					props.onChange({ date: ISSUED && { issued: ISSUED, paid: PAID }, hourly_rate });
				}}
				value={HOURLY_RATE}
			/>
		</BorderLabeledField>
	);
}
