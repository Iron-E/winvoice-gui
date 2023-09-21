import React from 'react';
import type { InputProps } from './props';
import { Input } from '../../form';

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `string` which can be used to construct a {@link Date}. */
export function InputDate(props: Omit<InputProps<string>, 'placeholder'>): React.ReactElement {
	return (
		<Input
			id={props.id}
			label={props.label ?? 'Date'}
			onChange={props.onChange}
			required={props.required}
			title={props.title}
			type='datetime-local'
			value={props.value}
		/>
	);
}
