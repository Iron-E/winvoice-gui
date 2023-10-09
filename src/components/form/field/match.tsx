'use client';

import React from 'react';
import type { CompositeProps, InputProps, SelectProps } from './props';
import type { Fn, Maybe } from "@/utils";
import type { Match } from "@/match";
import { Input, Select } from "../field";

type InputComponent<T> = (p: Omit<InputProps<T>, 'value'> & { value?: T }) => React.ReactElement;

const ANY = Symbol('any');
const EQUAL_TO = Symbol('equal_to');

type MatchOperators =
	| 'and'
	| typeof ANY
	| typeof EQUAL_TO
	| 'or'
	| `${'greater' | 'less'}_than`
	| 'in_range'
	| 'not'
	;

/** The `<options>` for {@link SelectMatchOperator}. */
const OPTIONS: readonly React.ReactElement[] = [
	<option key={0} value='and'>And</option>,
	<option key={1} value={ANY.description}>Any</option>,
	<option key={2} value={EQUAL_TO.description}>Equal to</option>,
	<option key={3} value='greater_than'>Greater than</option>,
	<option key={4} value='in_range'>In Range</option>,
	<option key={5} value='less_than'>Less than</option>,
	<option key={6} value='not'>Not</option>,
	<option key={7} value='or'>Or</option>,
];

/** A map of values from the valid strings which are accepted by `<option>.value` to valid {@link MatchOperators}. */
const OPTIONS_VALUE_MAP: Partial<Record<string, MatchOperators>> = {
	[ANY.description!]: ANY,
	[EQUAL_TO.description!]: EQUAL_TO,
}

function doNothing(): void { }

/** A lookup table for handlers used in {@link handleOperatorChange}. */
const HANDLE_OPERATOR_CHANGE: Record<
	MatchOperators,
	<T>(handler: Fn<[value: Match<Maybe<T>>]>, condition: Match<Maybe<T>>, operator: MatchOperators) => void
> = {
	and: (h, c) => h({ and: [c] }),
	[ANY]: h => h('any'),
	[EQUAL_TO]: _ => { throw new Error('Unimplemented'); },
	greater_than: _ => { throw new Error('Unimplemented'); },
	in_range: _ => { throw new Error('Unimplemented'); },
	less_than: _ => { throw new Error('Unimplemented'); },
	not: (h, c) => h({ not: c }),
	or: (h, c) => h({ or: [c] }),
};

/** @returns handler for {@link SelectMatchOperator} `onChange` events. */
function handleOperatorChange<T>(
	handleChange: Fn<[value: Match<Maybe<T>>]>,
	condition: Match<Maybe<T>>,
	currentOperator: MatchOperators
): (newOperator: MatchOperators) => void {
	return newOperator => HANDLE_OPERATOR_CHANGE[newOperator](handleChange, condition, currentOperator);
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
				onChange={handleOperatorChange(props.onChange, props.value, ANY)}
				value='any'
			/>

			<InputField Field={props.inputField} id={props.id} onChange={doNothing} />
		</>;
	} else if (props.value instanceof Object) {
		const GREATER_THAN = 'greater_than' in props.value;
		if (GREATER_THAN || 'less_than' in props.value) {
			const VALUE: MatchOperators = GREATER_THAN ? 'greater_than' : 'less_than';
			return <>
				<SelectMatchOperator
					id={props.id}
					onChange={handleOperatorChange(props.onChange, props.value, VALUE)}
					value={VALUE}
				/>

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
			onChange={handleOperatorChange(props.onChange, props.value as Maybe<T>, EQUAL_TO)}
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
function SelectMatchOperator(props: Omit<SelectProps<MatchOperators>, 'title'>): React.ReactElement {
	return (
		<Select
			id={`${props.id}--operator`}
			label='Operator'
			onChange={value => props.onChange?.(OPTIONS_VALUE_MAP[value] ?? value as MatchOperators)}
			title='The type of condition which is applied to the Operand'
			value={props.value}
		>
			{OPTIONS}
		</Select>
	);
}
