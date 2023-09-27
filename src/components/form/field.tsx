import React from 'react';
import type { Children, Class, Id, On } from '../props-with';
import type { IntrinsicProp } from '@/utils';
import { FLEX, FLEX_BETWEEN, SPACE } from '../css';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export * from './field/contact-kind';
export * from './field/currency';
export * from './field/date';
export * from './field/duration';
export * from './field/id';
export * from './field/invoice';
export * from './field/money';
export * from './field/string';

/** Properties shared by all labeled elements. */
type FieldProps<TElement extends Element, ElementName extends keyof React.JSX.IntrinsicElements> =
	Children
	& Class<ElementName>
	& (React.ChangeEvent<TElement> extends { target: { value: infer Value } }
		? On<'change', [value: Value]>
		: never
	)
	& Required<Id>
	& { [key in 'required' | 'value']?: IntrinsicProp<ElementName, key> }
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

/** A `<label>` for winvoice `<form>` fields. */
function Label(props: Children & Class & { required?: boolean, htmlFor: string }): React.ReactElement {
	return (
		<label className={`ml-1 ${props.className}`} htmlFor={props.htmlFor} title={`This field is ${props.required ? 'required' : 'optional'}`}>
			{props.children}
			{props.required && <span className='text-form-label-fg-required'> *</span>}
		</label>
	);
}

/** A `<form>` which has indicators to show whether it is invalid. */
function Validatable(props: Children): React.ReactElement {
	return (
		<span className='relative'>
			{props.children}

			<ExclamationCircleIcon
				className='absolute top-1.5 w-[1.25em] right-1 rounded-2xl \
bg-form-field-bg text-form-label-fg-invalid invisible peer-invalid:visible'
				title='This value is invalid'
			/>
		</span>
	);
}

/** @returns an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function Input(props:
	& FieldProps<HTMLInputElement, 'input'>
	& { [key in 'pattern' | 'placeholder' | 'type']?: InputProps[key] }
): React.ReactElement {
	return <>
		<span className={`${FLEX_BETWEEN} gap-5`}>
			<Label className='self-end' htmlFor={props.id} required={props.required} >
				{props.label}
			</Label>

			<span className={`${FLEX} justify-right mr-[-0.25rem] gap-1`}>
				{props.children}
			</span>
		</span>

		<Validatable>
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
		</Validatable>
	</>;
}

/** @returns an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function Select(props: FieldProps<HTMLSelectElement, 'select'>): React.ReactElement {
	return <>
		<span className='flex'>
			<Label className='self-end' htmlFor={props.id} required={props.required} >
				{props.label}
			</Label>
		</span>

		<Validatable>
			<select
				className={`${FIELD_STYLE} ${props.selectClassName} peer w-full`}
				id={props.id}
				name={props.id}
				onChange={props.onChange && (e => props.onChange!(e.target.value))}
				required={props.required}
				title={props.title}
				value={props.value}
			>
				{props.children}
			</select>
		</Validatable>
	</>;
}

type TextareaProps = React.JSX.IntrinsicElements['textarea'];

/** @returns an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function Textarea(props:
	& FieldProps<HTMLTextAreaElement, 'textarea'>
	& { [key in 'placeholder']?: TextareaProps[key] }
): React.ReactElement {
	return <>
		<Label className='justify-end' htmlFor={props.id} required={props.required}>
			{props.label}
		</Label>

		<Validatable>
			<textarea
				className={`${FIELD_STYLE} ${props.textareaClassName} peer w-full`}
				id={props.id}
				name={props.id}
				onChange={props.onChange && (e => props.onChange!(e.target.value))}
				placeholder={props.placeholder}
				required={props.required}
				title={props.title}
				value={props.value}
			/>
		</Validatable>
	</>;
}
