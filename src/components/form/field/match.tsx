'use client';

import React from 'react';
import type { CompositeProps, InputProps, SelectProps } from './props';
import type { Fn, Maybe } from "@/utils";
import type { Match } from "@/match";
import { Input, Select } from "../field";
import { BorderLabeledField, GRID } from './border-labeled';

type InputComponent<T> = (p: Omit<InputProps<T>, 'value'> & { value?: T }) => React.ReactElement;

const ANY = Symbol('any');
const EQUAL_TO = Symbol('equal_to');

/** The operators of a match condition. */
type MatchOperators =
	| 'and'
	| typeof ANY
	| typeof EQUAL_TO
	| 'or'
	| `${'greater' | 'less'}_than`
	| 'in_range'
	| 'not'
	;

/** {@link Match}es {@link Maybe<T>}. */
type MayMatch<T> = Match<Maybe<T>>;

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

/** Maps a condition's {@link MatchOperator | operator} to an instruction which will extract the operand. */
const CONDITION_TO_OPERAND: Readonly<Partial<Record<MatchOperators, <T>(condition: MayMatch<T>) => Maybe<T>>>> = {
	[EQUAL_TO]: <T,>(c: MayMatch<T>) => c as Maybe<T>,
	greater_than: c => (c as Record<'greater_than', any>).greater_than,
	in_range: c => (c as Record<'in_range', any>).in_range[0],
	less_than: c => (c as Record<'less_than', any>).less_than,
};

/** A lookup table for handlers used in {@link handleOperatorChange}. */
const HANDLE_OPERATOR_CHANGE: Readonly<Record<
	MatchOperators,
	<T>(handler: Fn<[value: MayMatch<T>]>, condition: MayMatch<T>, operator: MatchOperators) => void
>> = {
	and: (h, c) => h({ and: [c] }),
	[ANY]: h => h('any'),
	[EQUAL_TO]: (h, c, o) => h(CONDITION_TO_OPERAND[o]?.(c)),
	greater_than: (h, c, o) => h({ greater_than: CONDITION_TO_OPERAND[o]?.(c) }),
	in_range: (h, c, o) => h({ in_range: [CONDITION_TO_OPERAND[o]?.(c), undefined] }),
	less_than: (h, c, o) => h({ less_than: CONDITION_TO_OPERAND[o]?.(c) }),
	not: (h, c) => h({ not: c }),
	or: (h, c) => h({ or: [c] }),
};

/** @returns handler for {@link SelectMatchOperator} `onChange` events. */
function handleOperatorChange<T>(
	handleChange: Fn<[value: MayMatch<T>]>,
	condition: MayMatch<T>,
	previousOperator: MatchOperators
): (newOperator: MatchOperators) => void {
	return newOperator => HANDLE_OPERATOR_CHANGE[newOperator](handleChange, condition, previousOperator);
}

/** @returns the `Field` with some defaults used for {@link InputMatch}. */
function InputField<T>(props:
	& { Field: InputComponent<T> }
	& { [key in 'id' | 'onChange']: Parameters<InputComponent<T>>[0][key] }
	& { [key in 'label' | 'value']?: Parameters<InputComponent<T>>[0][key] }
): React.ReactElement {
	return (
		<props.Field
			id={`${props.id}--operand`}
			label={props.label ?? 'Operand'}
			onChange={props.onChange}
			placeholder=''
			required={true}
			title='The value which is used in combination with the Operator field to form a condition'
			value={props.value}
		/>
	);
}


/** @returns a form field to {@link Select} the match operator and {@link Input} the operand to form a {@link Match} condition. */
export function InputMatch<T>(props:
	& Omit<CompositeProps<MayMatch<T>>, 'label'>
	& { inputField: InputComponent<T> }
): React.ReactElement {
	if (props.value === 'any') {
		return <>
			<SelectMatchOperator
				id={props.id}
				onChange={handleOperatorChange(props.onChange, props.value, ANY)}
				value={ANY.description!}
			/>

			<InputField Field={props.inputField} id={props.id} onChange={doNothing} />
		</>;
	}

	if (props.value instanceof Object) {
		const GREATER_THAN = 'greater_than' in props.value;
		if (GREATER_THAN || 'less_than' in props.value) {
			const OPERATOR: MatchOperators = GREATER_THAN ? 'greater_than' : 'less_than';
			return <>
				<SelectMatchOperator
					id={props.id}
					onChange={handleOperatorChange(props.onChange, props.value, OPERATOR)}
					value={OPERATOR}
				/>

				<InputField
					Field={props.inputField}
					id={props.id}
					onChange={value => props.onChange({ [OPERATOR]: value } as MayMatch<T>)}
					value={CONDITION_TO_OPERAND[OPERATOR]?.(props.value)}
				/>
			</>;
		}

		if ('in_range' in props.value) {
			const [LOWER, UPPER] = props.value.in_range;
			return <>
				<SelectMatchOperator
					id={props.id}
					onChange={handleOperatorChange(props.onChange, props.value, 'in_range')}
					value='in_range'
				/>

				<BorderLabeledField className={GRID} label='Operand'>
					<InputField
						Field={props.inputField}
						id={`${props.id}--lower`}
						label='Lower'
						onChange={value => props.onChange({ in_range: [value as Maybe<T>, UPPER] })}
						value={LOWER}
					/>

					<InputField
						Field={props.inputField}
						id={`${props.id}--upper`}
						label='Upper'
						onChange={value => props.onChange({ in_range: [LOWER, value as Maybe<T>] })}
						value={UPPER}
					/>
				</BorderLabeledField>
			</>;
		}

		const AND = 'and' in props.value;
		if (AND || 'or' in props.value) {
			const OPERATOR = AND ? 'and' : 'or';
			const OPERANDS = (props.value as Record<typeof OPERATOR, MayMatch<T>[]>)[OPERATOR];
			return <>
				<SelectMatchOperator
					id={props.id}
					onChange={handleOperatorChange(props.onChange, props.value, OPERATOR)}
					value={OPERATOR}
				/>

				<BorderLabeledField label='Conditions'>
					{OPERANDS.map((condition, i) =>
						<BorderLabeledField key={i} label={`${i + 1}`}>
							<InputMatch
								id={`${props.id}--and-${i}`}
								inputField={props.inputField}
								onChange={value => props.onChange({ [OPERATOR]: OPERANDS.with(i, value) } as MayMatch<T>)}
								value={condition}
							/>
						</BorderLabeledField>
					)}
				</BorderLabeledField>
			</>;
		}

		if ('not' in props.value) {
			return <>
				<SelectMatchOperator
					id={props.id}
					onChange={handleOperatorChange(props.onChange, props.value, 'not')}
					value='not'
				/>

				<BorderLabeledField label='Operand'>
					<InputMatch
						id={`${props.id}--not`}
						inputField={props.inputField}
						onChange={value => props.onChange({ not: value } as MayMatch<T>)}
						value={props.value.not}
					/>
				</BorderLabeledField>
			</>;
		}
	}

	return <>
		<SelectMatchOperator
			id={props.id}
			onChange={handleOperatorChange(props.onChange, props.value as Maybe<T>, EQUAL_TO)}
			value={EQUAL_TO.description!}
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
