import React from 'react';
import type { InputMatchObjectProps } from './props';
import type { MatchLocation } from '@/match';
import { InputMatchIdAndName } from './id-name';
import { InputMatchOption } from '../match';
import { SelectMatchOptionCurrency } from './currency';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchLocation} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchLocation(props: InputMatchObjectProps<MatchLocation>): React.ReactElement {
	const VALUE = props.value ?? {};
	return <>
		<SelectMatchOptionCurrency
			id={`${props.id}--currency`}
			label='Currency'
			onChange={currency => props.onChange({ ...VALUE, currency })}
			value={VALUE.currency ?? 'any'}
		/>

		<InputMatchIdAndName id={props.id} onChange={props.onChange} value={VALUE} />

		<InputMatchOption
			id={`${props.id}--outer`}
			inputField={InputMatchLocation}
			label='Outer Location'
			onChange={outer => props.onChange({ ...VALUE, outer })}
			value={VALUE.outer ?? 'any'}
		/>
	</>;
}
