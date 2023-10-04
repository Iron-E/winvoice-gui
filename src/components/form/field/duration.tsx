import React from 'react';
import type { InputProps } from './props';
import { Input } from '../../form';

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `duration`. */
export function InputDuration(props: Omit<InputProps<string>, 'placeholder'>): React.ReactElement {
	return (
		<Input
			id={props.id}
			inputClassName='min-w-[25ch]'
			label={props.label ?? 'Duration'}
			onChange={props.onChange}
			pattern='(\d+\s*(m(in(utes?)?)?|h(r|ours?)?|d(ays?)?|w(eeks?)?|months?|y(ears?)?)\s*)+'
			placeholder='1y 2months 5w 3d 10h 40m'
			required={props.required}
			title={props.title}
			type='text'
			value={props.value}
		/>
	);
}
