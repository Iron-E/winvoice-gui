import React from 'react';
import type { Children, Class, Id, On } from './props-with';
import { FLEX_BETWEEN } from './css';

type InputProps = React.JSX.IntrinsicElements['input'];

/** @return an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function LabeledInput(
	props:
		Children
		& Class<'label'>
		& Class<'input'>
		& Required<Id & On<'change', [value: React.ChangeEvent<HTMLInputElement>['target']['value']]>>
		& { label: string, required?: InputProps['required'], type?: InputProps['type'], value?: InputProps['value'] },
): React.ReactElement {
	return <>
		<span className={FLEX_BETWEEN}>
			<label className={props.labelClassName} htmlFor={props.id}>
				{props.label}
			</label>
			{props.children}
		</span>

		<input
			className={`p-1 rounded-md ${props.inputClassName}`}
			id={props.id}
			name={props.id}
			onChange={e => props.onChange(e.target.value)}
			required={props.required}
			type={props.type}
			value={props.value}
		/>
	</>;
}
