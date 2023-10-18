import React from 'react';
import type { Children, Class, Id, On } from '../props-with';
import type { IntrinsicProp, ValueOf } from '@/utils';
import { FLEX, FLEX_BETWEEN, SPACE } from '../css';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export * from './field/contact-kind';
export * from './field/currency';
export * from './field/date';
export * from './field/duration';
export * from './field/id';
export * from './field/invoice';
export * from './field/match';
export * from './field/money';
export * from './field/password';
export * from './field/string';

/** Properties shared by all labeled elements. */
type FieldProps<TElement extends Element, ElementName extends keyof React.JSX.IntrinsicElements> =
	Children
	& Class<ElementName>
	& (React.ChangeEvent<TElement> extends { target: { value: infer Value } }
		? Required<On<'change', [value: Value]>>
		: never
	)
	& Required<Id>
	& { [key in 'required']?: IntrinsicProp<ElementName, key> }
	& { [key in 'title' | 'value']: NonNullable<IntrinsicProp<ElementName, key>> }
	& {
		label: string,
		validateIconRight?: string,
		validateIconTop?: string,
	}
	;


type InputProps = ValueOf<React.JSX.IntrinsicElements, 'input'>;

/** @returns an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function Checkbox(props:
	& Omit<FieldProps<HTMLInputElement, 'input'>, 'label' | 'onChange' | 'required' | 'value'>
	& Required<On<'change', [value: boolean]>>
	& { [key in 'checked']?: InputProps[key] }
): React.ReactElement {
	return (
		<label>
			<input
				checked={props.checked}
				className={`${`${SPACE} bg-form-field-bg h-full` as const} ${props.inputClassName}`}
				name={props.id}
				onChange={() => props.onChange(props.checked ?? false)}
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
		<label
			className={`ml-1 ${props.className}`}
			htmlFor={props.htmlFor}
			title={`This field is ${props.required ? 'required' : 'optional'}`}
		>
			{props.children}
			{props.required && <span className='text-form-label-fg-required'> *</span>}
		</label>
	);
}

/** A `<form>` which has indicators to show whether it is invalid. */
function ValidateIcon(props: Children & { iconRight?: string, iconTop?: string }): React.ReactElement {
	return (
		<span className='relative mb-3'>
			{props.children}

			<ExclamationCircleIcon
				className={`absolute ${props.iconRight ?? 'right-1'} ${props.iconTop ?? 'top-[0.4rem]'} w-[1.25em] \
rounded-2xl bg-form-field-bg text-form-label-fg-invalid invisible peer-invalid:visible`}
				title='This value is invalid'
			/>
		</span>
	);
}

/** @returns an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function Input(props: FieldProps<HTMLInputElement, 'input'> & {
	[key in 'pattern' | 'placeholder' | 'type']?: InputProps[key];
}): React.ReactElement {
	return <>
		<span className={`${FLEX_BETWEEN} gap-5`}>
			<Label className='self-end' htmlFor={props.id} required={props.required} >
				{props.label}
			</Label>

			<span className={`${FLEX} justify-right mr-[-0.25rem] gap-1`}>
				{props.children}
			</span>
		</span>

		<ValidateIcon iconRight={props.validateIconRight} iconTop={props.validateIconTop}>
			<input
				className={`${`${SPACE} bg-form-field-bg h-full` as const} ${props.inputClassName} peer w-full`}
				id={props.id}
				name={props.id}
				onChange={e => props.onChange(e.target.value)}
				pattern={props.pattern}
				placeholder={props.placeholder}
				required={props.required}
				title={props.title}
				type={props.type}
				value={props.value}
			/>
		</ValidateIcon>
	</>;
}

/** @returns an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function Select(props: FieldProps<HTMLSelectElement, 'select'> & Children<'label'>): React.ReactElement {
	return <>
		<span className={`${FLEX_BETWEEN} gap-5`}>
			<Label className='self-end' htmlFor={props.id} required={props.required} >
				{props.label}
			</Label>

			<span className={`${FLEX} justify-right mr-[-0.25rem] gap-1`}>
				{props.labelChildren}
			</span>
		</span>

		<ValidateIcon iconRight={props.validateIconRight ?? 'right-3'} iconTop={props.validateIconTop}>
			<select
				className={`${`${SPACE} bg-form-field-bg h-full` as const} ${props.selectClassName} peer w-full`}
				id={props.id}
				name={props.id}
				onChange={e => props.onChange(e.target.value)}
				required={props.required}
				title={props.title}
				value={props.value}
			>
				{props.children}
			</select>
		</ValidateIcon>
	</>;
}

type TextareaProps = ValueOf<React.JSX.IntrinsicElements, 'textarea'>;

/** @returns an {@link JSX.IntrinsicElements.input | input} which has a corresponding label. */
export function Textarea(props: FieldProps<HTMLTextAreaElement, 'textarea'> & {
	[key in 'placeholder']?: TextareaProps[key];
}): React.ReactElement {
	return <>
		<Label className='justify-end' htmlFor={props.id} required={props.required}>
			{props.label}
		</Label>

		<ValidateIcon iconRight={props.validateIconRight} iconTop={props.validateIconTop}>
			<textarea
				className={`${`${SPACE} bg-form-field-bg h-full` as const} ${props.textareaClassName} peer w-full min-h-[2rem] rounded-br-none`}
				id={props.id}
				name={props.id}
				onChange={e => props.onChange(e.target.value)}
				placeholder={props.placeholder}
				required={props.required}
				title={`${props.title}. Markdown syntax works!`}
				value={props.value}
			/>
		</ValidateIcon>
	</>;
}
