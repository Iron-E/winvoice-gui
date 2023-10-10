'use client';

import React from 'react';
import type { CompositeProps, InputProps } from './props';
import type { Match } from "@/match";
import { ANY, EQUAL_TO, type MatchOperators, SelectMatchOperator } from './match/operator';
import { BorderLabeledField, GRID } from './border-labeled';
import { doNothing, type Fn, type Maybe } from "@/utils";
import { Input, Select } from "../field";

/** A react component which can be used to input an operand value for a {@link Match} condition.  */
type InputComponent<T> = (p: Omit<InputProps<T>, 'value'> & { value?: T }) => React.ReactElement;

/** {@link Match}es {@link Maybe<T>}. */
type MayMatch<T> = Match<Maybe<T>>;

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
): (previousOperator: MatchOperators, newOperator: MatchOperators) => void {
	return (p, n) => HANDLE_OPERATOR_CHANGE[n](handleChange, condition, p);
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
				onChange={handleOperatorChange(props.onChange, props.value)}
				value={ANY}
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
					onChange={handleOperatorChange(props.onChange, props.value)}
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
					onChange={handleOperatorChange(props.onChange, props.value)}
					value='in_range'
				/>

				<BorderLabeledField className={GRID} label='Operand'>
					<InputField
						Field={props.inputField}
						id={`${props.id}--lower`}
						label='Greater than or equal to'
						onChange={value => props.onChange({ in_range: [value as Maybe<T>, UPPER] })}
						value={LOWER}
					/>

					<InputField
						Field={props.inputField}
						id={`${props.id}--upper`}
						label='Less than'
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
					onChange={handleOperatorChange(props.onChange, props.value)}
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
					onChange={handleOperatorChange(props.onChange, props.value)}
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
			onChange={handleOperatorChange(props.onChange, props.value as Maybe<T>)}
			value={EQUAL_TO}
		/>

		<InputField
			Field={props.inputField}
			id={props.id}
			onChange={props.onChange as Fn<[T]>}
			value={props.value as Maybe<T>}
		/>
	</>;
}
