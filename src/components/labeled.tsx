import React from 'react';
import type { Children, Class, Id, On } from './props-with';
import { FLEX_BETWEEN } from './css';

/** Properties shared by all labeled elements. */
type LabeledProps<ElementName extends string> =
	Children
	& Class<'label'>
	& Class<ElementName>
	& Required<Id>
	& { label: string }
	;

type InputProps = React.JSX.IntrinsicElements['input'];

/** @return an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function LabeledInput(
	props:
		LabeledProps<'input'>
		& Required<On<'change', [value: React.ChangeEvent<HTMLInputElement>['target']['value']]>>
		& {
			required?: InputProps['required'],
			title: Required<InputProps['title']>,
			type?: InputProps['type'],
			value?: InputProps['value'],
		},
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
			title={props.title}
			type={props.type}
			value={props.value}
		/>
	</>;
}

type SelectProps = React.JSX.IntrinsicElements['select'];

/** @return an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function LabeledSelect(
	props:
		LabeledProps<'select'>
		& Required<On<'change', [value: React.ChangeEvent<HTMLSelectElement>['target']['value']]>>
		& {
			required?: SelectProps['required'],
			title: Required<SelectProps['title']>,
			value?: SelectProps['value'],
		},
): React.ReactElement {
	return <>
		<label className={props.labelClassName} htmlFor={props.id}>
			{props.label}
		</label>

		<select
			className={`p-1 rounded-md ${props.selectClassName}`}
			id={props.id}
			name={props.id}
			onChange={e => props.onChange(e.target.value)}
			required={props.required}
			title={props.title}
			value={props.value}
		>
			{props.children}
		</select>
	</>;
}
