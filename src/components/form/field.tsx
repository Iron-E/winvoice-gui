import React from 'react';
import type { Children, Class, Id, On } from '../props-with';
import type { IntrinsicProp } from '@/utils';
import { FLEX, FLEX_BETWEEN, SPACE } from '../css';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export { InputId, useIdEventHandlers } from './field/id';
export { InputString } from './field/string';
export { SelectCurrency } from './field/currency';

/** Properties shared by all labeled elements. */
type FieldProps<TElement extends Element, ElementName extends keyof React.JSX.IntrinsicElements> =
	Children
	& Class<ElementName>
	& (React.ChangeEvent<TElement> extends { target: { value: infer Value } }
		? On<'change', [value: Value]>
		: never
	)
	& Required<Id>
	& { [key in 'value']?: IntrinsicProp<ElementName, key> }
	& {
		label: string,
		title: IntrinsicProp<ElementName, 'title'>,
	}
	;

/** The style of a form field. */
const FIELD_STYLE = `${SPACE} mb-2 bg-form-field-bg` as const;


type InputProps = React.JSX.IntrinsicElements['input'];

/** @returns an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function Checkbox(props:
	& Omit<FieldProps<HTMLInputElement, 'input'>, 'label' | 'onChange' | 'required' | 'value'>
	& On<'change', [value: boolean]>
	& { [key in 'checked']?: InputProps[key] }
): React.ReactElement {
	return (
		<label>
			<input
				checked={props.checked}
				className={`${FIELD_STYLE} ${props.inputClassName}`}
				name={props.id}
				onChange={props.onChange && (() => props.onChange!(props.checked ?? false))}
				title={props.title}
				type='checkbox'
				value={props.checked ? 'true' : 'false'}
			/>

			{props.children}
		</label>
	);
}

/** @returns an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function Input(props:
	& FieldProps<HTMLInputElement, 'input'>
	& { [key in 'pattern' | 'placeholder' | 'required' | 'type']?: InputProps[key] }
): React.ReactElement {
	return <>
		<span className={`${FLEX_BETWEEN} gap-5`}>
			<label className='ml-1 self-end' htmlFor={props.id} title={props.required ? 'This field is required' : undefined}>
				{props.label}
				{props.required && <span className='text-form-label-fg-required'> *</span>}
			</label>

			<span className={`${FLEX} justify-right mr-[-0.25rem] gap-1`}>
				{props.children}
			</span>
		</span>

		<span className='relative'>
			<input
				className={`${FIELD_STYLE} ${props.inputClassName} peer w-full`}
				id={props.id}
				name={props.id}
				onChange={props.onChange && (e => props.onChange!(e.target.value))}
				pattern={props.pattern}
				placeholder={props.placeholder}
				required={props.required}
				title={props.title}
				type={props.type}
				value={props.value}
			/>

			<ExclamationCircleIcon
				className='absolute top-1.5 w-[1.25em] right-1 rounded-2xl \
bg-form-field-bg text-form-label-fg-invalid invisible peer-invalid:visible'
				title='This value is invalid'
			/>
		</span>
	</>;
}

/** @returns an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function Select(props: FieldProps<HTMLSelectElement, 'select'>): React.ReactElement {
	return <>
		<label className='ml-1 justify-end' htmlFor={props.id}>
			{props.label}
		</label>

		<select
			className={`${FIELD_STYLE} w-full ${props.selectClassName}`}
			id={props.id}
			name={props.id}
			onChange={props.onChange && (e => props.onChange!(e.target.value))}
			title={props.title}
			value={props.value}
		>
			{props.children}
		</select>
	</>;
}
