import React from 'react';
import type { InputProps } from './props';
import { Input } from '../../form';

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `duration`. */
export function InputDuration(props: InputProps<string>): React.ReactElement {
	return (
		<Input
			id={props.id}
			label={props.label ?? 'Duration'}
			onChange={props.onChange}
			pattern='(\d+\s*(m(in(utes?)?)?|h(r|ours?)?|d(ays?)?|w(eeks?)?|months?|y(ears?)?)\s*)+'
			required={props.required}
			title={`${props.title}. e.g. "1y 2months 5w 3d 10h 40m"`}
			type='text'
			value={props.value}
		/>
	);
}
