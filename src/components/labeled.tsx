import React from 'react';
import type { Children, Class, Id, On } from './props-with';
import type { IntrinsicProp } from '@/utils';
import { FLEX, FLEX_BETWEEN, SPACE } from './css';

/** Properties shared by all labeled elements. */
type LabeledProps<TElement extends Element, ElementName extends keyof React.JSX.IntrinsicElements> =
	Children
	& Class<'label'>
	& Class<ElementName>
	& (React.ChangeEvent<TElement> extends { target: { value: infer Value } }
		? On<'change', [value: Value]>
		: never
	)
	& Required<Id>
	& {
		disabled?: IntrinsicProp<ElementName, 'disabled'>,
		label: string,
		required?: IntrinsicProp<ElementName, 'required'>,
		title: IntrinsicProp<ElementName, 'title'>,
		value?: IntrinsicProp<ElementName, 'value'>,
	}
	;

/** The style of a form field. */
const FIELD_STYLE = `${SPACE} \
bg-form-field-bg disabled:bg-form-field-bg-disabled \
border-form-field-border hover:border-form-field-border-hover` as const;

type InputProps = React.JSX.IntrinsicElements['input'];

/** @return an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function LabeledInput(
	props:
		LabeledProps<HTMLInputElement, 'input'>
		& {
			inputRef?: InputProps['ref'],
			type?: InputProps['type'],
		}
): React.ReactElement {
	return <>
		<span className={`${FLEX_BETWEEN} gap-5`}>
			<label className='ml-1 self-end' htmlFor={props.id}>
				{props.label}
			</label>

			<span className={`${FLEX} justify-right mr-1 gap-1`}>
				{props.children}
			</span>
		</span>

		<input
			className={`${FIELD_STYLE} ${props.inputClassName}`}
			disabled={props.disabled}
			id={props.id}
			name={props.id}
			onChange={e => props.onChange?.(e.target.value)}
			ref={props.inputRef}
			required={props.required}
			title={props.title}
			type={props.type}
			value={props.value}
		/>
	</>;
}

/** @return an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function LabeledSelect(props: LabeledProps<HTMLSelectElement, 'select'>): React.ReactElement {
	return <>
		<label className='ml-1 justify-end' htmlFor={props.id}>
			{props.label}
		</label>

		<select
			className={`${FIELD_STYLE} ${props.selectClassName}`}
			disabled={props.disabled}
			id={props.id}
			name={props.id}
			onChange={(e => props.onChange?.(e.target.value))}
			required={props.required}
			title={props.title}
			value={props.value}
		>
			{props.children}
		</select>
	</>;
}
