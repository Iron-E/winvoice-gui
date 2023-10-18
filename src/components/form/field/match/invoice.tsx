import React from 'react';
import type { InputMatchObjectProps } from './props';
import type { MatchInvoice } from '@/match';
import { InputMatchMoney } from './money';
import { InputMatchOptionDate } from './date';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchInvoice} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchInvoice(props: InputMatchObjectProps<MatchInvoice>): React.ReactElement {
	const VALUE = props.value ?? {};
	return <>
		<InputMatchOptionDate
			id={`${props.id}--date--issued`}
			onChange={date_issued => props.onChange({ ...VALUE, date_issued })}
			value={VALUE.date_issued ?? 'any'}
		/>

		<InputMatchOptionDate
			id={`${props.id}--date--paid`}
			onChange={date_paid => props.onChange({ ...VALUE, date_paid })}
			value={VALUE.date_paid ?? 'any'}
		/>

		<InputMatchMoney
			id={`${props.id}--hourly-rate`}
			onChange={hourly_rate => props.onChange({ ...VALUE, hourly_rate })}
			value={VALUE.hourly_rate ?? 'any'}
		/>
	</>;
}
