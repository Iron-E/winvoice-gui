'use client';

import React from 'react';
import type { InputMatchObjectProps } from './props';
import type { MatchInvoice } from '@/match';
import { InputMatchMoney } from './money';
import { InputMatchOptionDate } from './date';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchInvoice} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchInvoice(props: InputMatchObjectProps<MatchInvoice>): React.ReactElement {
	return <>
		<InputMatchOptionDate
			id={`${props.id}--date--issued`}
			onChange={date_issued => props.onChange({ ...props.value, date_issued })}
			value={props.value.date_issued ?? 'any'}
		/>

		<InputMatchOptionDate
			id={`${props.id}--date--paid`}
			onChange={date_paid => props.onChange({ ...props.value, date_paid })}
			value={props.value.date_paid ?? 'any'}
		/>

		<InputMatchMoney
			id={`${props.id}--hourly-rate`}
			onChange={hourly_rate => props.onChange({ ...props.value, hourly_rate })}
			value={props.value.hourly_rate ?? 'any'}
		/>
	</>;
}
