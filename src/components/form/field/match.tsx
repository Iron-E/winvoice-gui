'use client';

import React from 'react';
import type { CompositeProps, InputProps, SelectProps } from './props';
import type { Fn, Maybe } from "@/utils";
import type { Match } from "@/match";
import { Input, Select } from "../field";

type InputComponent<T> = (p: Omit<InputProps<T>, 'value'> & { value?: T }) => React.ReactElement;
type KeyofMatch =
	| 'any'
	| null // equal to; has no key
	| 'and'
	| 'or'
	| `${'greater' | 'less'}_than`
	| 'in_range'
	| 'not'
	;

const OPTIONS: readonly React.ReactElement[] = [
	<option key={0} value='and'>And</option>,
	<option key={1} value='any'>Any</option>,
	<option key={2} value=''>Equal to</option>,
	<option key={3} value='greater_than'>Greater than</option>,
	<option key={4} value='in_range'>In Range</option>,
	<option key={5} value='less_than'>Less than</option>,
	<option key={6} value='not'>Not</option>,
	<option key={7} value='or'>Or</option>,
];

function doNothing(): void { }

/** @returns handler for {@link SelectMatchOperator} `onChange` events. */
function handleOperatorChange<T>(
	handleChange: Fn<[value: Match<Maybe<T>>]>,
	condition: Match<Maybe<T>>,
	currentOperator: KeyofMatch
): (newOperator: KeyofMatch) => void {
	return newOperator => {
		switch (newOperator) {
			case null:
				throw new Error('Unimplemented');
			case 'and':
				handleChange({ and: [condition] });
			case 'any':
				handleChange('any');
			case 'greater_than':
				throw new Error('Unimplemented');
			case 'in_range':
				throw new Error('Unimplemented');
			case 'less_than':
				throw new Error('Unimplemented');
			case 'not':
				handleChange({ not: condition });
			case 'or':
				handleChange({ or: [condition] });
		};
	};
}

/** @returns the `Field` with some defaults used for {@link InputMatch}. */
function InputField<T>(props:
	& { Field: InputComponent<T> }
	& { [key in 'id' | 'onChange']: Parameters<InputComponent<T>>[0][key] }
	& { [key in 'value']?: Parameters<InputComponent<T>>[0][key] }
): React.ReactElement {
	return (
		<props.Field
			id={`${props.id}--operand`}
			label='Operand'
			onChange={props.onChange}
			placeholder=''
			title='The value which is used in combination with the Operator field to form a condition'
			value={props.value}
		/>
	);
}


/** @returns a form field to {@link Select} the match operator and {@link Input} the operand to form a {@link Match} condition. */
export function InputMatch<T>(props:
	& CompositeProps<Match<Maybe<T>>>
	& { inputField: InputComponent<T> }
): React.ReactElement {
	if (props.value === 'any') {
		return <>
			<SelectMatchOperator
				id={props.id}
				onChange={handleOperatorChange(props.onChange, props.value, 'any')}
				value='any'
			/>

			<InputField Field={props.inputField} id={props.id} onChange={doNothing} />
		</>;
	} else if (props.value instanceof Object) {
		const GREATER_THAN = 'greater_than' in props.value;
		if (GREATER_THAN || 'less_than' in props.value) {
			if (GREATER_THAN) {
				var onChange = handleOperatorChange(props.onChange, props.value, 'greater_than')
				var value = 'greater_than'
			} else {
				var onChange = handleOperatorChange(props.onChange, props.value, 'less_than')
				var value = 'less_than'
			}

			return <>
				<SelectMatchOperator id={props.id} onChange={onChange} value={value} />
				<InputField
					Field={props.inputField}
					id={props.id}
					onChange={props.onChange as Fn<[T]>}
					value={props.value as Maybe<T>}
				/>
			</>;
		}
	}

	return <>
		<SelectMatchOperator
			id={props.id}
			onChange={handleOperatorChange(props.onChange, props.value as Maybe<T>, null)}
			value=''
		/>

		<InputField
			Field={props.inputField}
			id={props.id}
			onChange={props.onChange as Fn<[T]>}
			value={props.value as Maybe<T>}
		/>
	</>;
}

/** A selector for the current 'variant' (e.g. 'and', 'any') of the {@link Match} condition. */
function SelectMatchOperator(props: Omit<SelectProps<KeyofMatch>, 'title'>): React.ReactElement {
	return (
		<Select
			id={`${props.id}--operator`}
			label='Operator'
			onChange={value => props.onChange?.(value === '' ? null : value as KeyofMatch)}
			title='The type of condition which is applied to the Operand'
			value={props.value}
		>
			{OPTIONS}
		</Select>
	);
}
