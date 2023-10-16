'use client';

import React from 'react';
import type { InputMatchObjectProps } from './props';
import type { MatchLocation } from '@/match';
import { InputMatchId } from './id';
import { InputMatchOption, InputMatchStr } from '../match';
import { SelectMatchOptionCurrency } from './currency';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchLocation} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchLocation(props: InputMatchObjectProps<MatchLocation>): React.ReactElement {
	return <>
		<SelectMatchOptionCurrency
			id={`${props.id}--currency`}
			label='Currency'
			onChange={currency => props.onChange({ ...props.value, currency })}
			value={props.value.currency ?? 'any'}
		/>

		<InputMatchId
			id={`${props.id}--id`}
			label='Id'
			onChange={id => props.onChange({ ...props.value, id })}
			value={props.value.id ?? 'any'}
		/>

		<InputMatchStr
			id={`${props.id}--name`}
			label='Name'
			onChange={name => props.onChange({ ...props.value, name })}
			value={props.value.name ?? 'any'}
		/>

		<InputMatchOption
			id={`${props.id}--outer`}
			inputField={InputMatchLocation}
			label='Outer Location'
			onChange={outer => props.onChange({ ...props.value, outer })}
			value={props.value.outer ?? 'any'}
		/>
	</>;
}