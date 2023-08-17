import React from 'react';
import type { Children, Class, Id, On } from './props-with';

type InputAttr = React.InputHTMLAttributes<HTMLInputElement>;

/** @return an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function LabeledInput(
	props:
		Children
		& Class<'label'>
		& Class<'input'>
		& Required<Id>
		& On<'change', [e: React.ChangeEvent<HTMLInputElement>]>
		& { required?: InputAttr['required'], type?: InputAttr['type'], value?: InputAttr['value'] },
): React.ReactElement {
	return (
		<>
			<label className={`mr-2 ${props.labelClassName}`} htmlFor={props.id}>
				{props.children}
			</label>

			<input
				className={`p-1 rounded ${props.inputClassName}`}
				id={props.id}
				name={props.id}
				onChange={props.onChange}
				required={props.required}
				type={props.type}
				value={props.value}
			/>
		</>
	);
}
