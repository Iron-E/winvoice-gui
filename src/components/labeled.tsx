import React from 'react';
import type { Children, Class, Id, On } from './props-with';
import { FLEX_BETWEEN, SPACE } from './css';

/** Properties shared by all labeled elements. */
type LabeledProps<ElementName extends string> =
	Children
	& Class<'label'>
	& Class<ElementName>
	& Required<Id>
	& { label: string }
	;

/** The style of a form field. */
const FIELD_STYLE = `${SPACE} bg-form-field-bg border-form-field-border hover:border-form-field-border-hover` as const;

type InputProps = React.JSX.IntrinsicElements['input'];

/** @return an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function LabeledInput(
	props:
		LabeledProps<'input'>
		& Partial<{
			inputRef: InputProps['ref'],
			required: InputProps['required'],
			type: InputProps['type'],
			value: InputProps['value'],
		}>
		& Required<
			On<'change', [value: React.ChangeEvent<HTMLInputElement>['target']['value']]>
			& { title: InputProps['title'] }
		>,
): React.ReactElement {
	return <>
		<span className={FLEX_BETWEEN}>
			<label className={props.labelClassName} htmlFor={props.id}>
				{props.label}
			</label>
			{props.children}
		</span>

		<input
			className={`${FIELD_STYLE} ${props.inputClassName}`}
			id={props.id}
			name={props.id}
			onChange={e => props.onChange(e.target.value)}
			ref={props.inputRef}
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
		& Partial<{ required: SelectProps['required'], value: SelectProps['value'] }>
		& Required<
			On<'change', [value: React.ChangeEvent<HTMLSelectElement>['target']['value']]>
			& { title: SelectProps['title'] }
		>,
): React.ReactElement {
	return <>
		<label className={props.labelClassName} htmlFor={props.id}>
			{props.label}
		</label>

		<select
			className={`${FIELD_STYLE} ${props.selectClassName}`}
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
