'use client';

import React from 'react';
import type { Money } from '@/schema';
import { CompositeProps } from './props';
import { Input, SelectCurrency } from '../field';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Money} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMoney(props: CompositeProps<Money>): React.ReactElement {
	const [AMOUNT, setAmount] = React.useState(props.value?.amount);
	const [CURRENCY, setCurrency] = React.useState(props.value?.currency);

	return (
		<div className='grid grid-rows-[1.5rem_1fr] grid-flow-col gap-x-2 [&_select]:h-[80%]'>
			<SelectCurrency
				id={`${props.id}--currency`}
				label={`${props.label} Currency`}
				onChange={currency => {
					setCurrency(currency)
					if (AMOUNT && currency) { props.onChange({ amount: AMOUNT, currency }); }
				}}
				required={true}
				title='The currency of money'
			/>

			<Input
				id={`${props.id}--amount`}
				label={`${props.label} Amount`}
				onChange={amount => {
					setAmount(amount);
					if (CURRENCY) { props.onChange({ amount, currency: CURRENCY }); }
				}}
				pattern='^\d+(\.\d+)?$'
				required={true}
				title='The amount of money'
				value={AMOUNT ?? ''}
			/>
		</div>
	);
}
