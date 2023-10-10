'use client';

import React from 'react';
import type { CompositeProps, InputProps } from './props';
import type { Match, MatchStr } from "@/match";
import {
	ANY,
	EQUAL_TO,
	OPERATOR_TO_OPERAND,
	SelectMatchOperator,
	SelectMatchStrOperator,
	STR_OPERATOR_TO_OPERAND,
	type MatchOperator,
	type MatchStrOperator,
	type MayMatch,
} from './match/operator';
import { BorderLabeledField, GRID } from './border-labeled';
import { doNothing, type Fn, type Maybe } from "@/utils";
import { Input, InputString, Select } from "../field";
import { AddIcon, RemoveIcon } from '@/components';

/** A react component which can be used to input an operand value for a {@link Match} condition.  */
type InputComponent<T> = (p: Omit<InputProps<T>, 'value'> & { value?: T }) => React.ReactElement;

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
			<SelectMatchOperator condition={props.value} id={props.id} onChange={props.onChange} value={ANY} />
			<InputField Field={props.inputField} id={props.id} onChange={doNothing} />
		</>;
	}

	// `<T>` might not support `in`, or be `undefined`.
	if (typeof props.value === 'object') {
		const GREATER_THAN = 'greater_than' in props.value;
		if (GREATER_THAN || 'less_than' in props.value) {
			const OPERATOR: MatchOperator = GREATER_THAN ? 'greater_than' : 'less_than';
			return <>
				<SelectMatchOperator condition={props.value} id={props.id} onChange={props.onChange} value={OPERATOR} />
				<InputField
					Field={props.inputField}
					id={props.id}
					onChange={value => props.onChange({ [OPERATOR]: value } as MayMatch<T>)}
					value={OPERATOR_TO_OPERAND[OPERATOR]!(props.value)}
				/>
			</>;
		}

		if ('in_range' in props.value) {
			const [LOWER, UPPER] = props.value.in_range;
			return <>
				<SelectMatchOperator condition={props.value} id={props.id} onChange={props.onChange} value='in_range' />
				<BorderLabeledField className={GRID} label='Operand'>
					<InputField
						Field={props.inputField}
						id={`${props.id}--gt-eq`}
						label='Greater than or equal to'
						onChange={value => props.onChange({ in_range: [value as Maybe<T>, UPPER] })}
						value={LOWER}
					/>

					<InputField
						Field={props.inputField}
						id={`${props.id}--lt`}
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
				<SelectMatchOperator condition={props.value} id={props.id} onChange={props.onChange} value={OPERATOR} />
				<BorderLabeledField
					button={{
						onClick: () => props.onChange({ [OPERATOR]: [...OPERANDS, undefined] } as MayMatch<T>),
						text: <AddIcon />,
					}}
					label='Conditions'
				>
					{OPERANDS.map((condition, i) =>
						<BorderLabeledField
							button={OPERANDS.length < 2 ? undefined : {
								onClick: () => props.onChange({ [OPERATOR]: OPERANDS.toSpliced(i, 1) } as MayMatch<T>),
								text: <RemoveIcon />,
							}}
							key={i}
							label={`${i + 1}`}
						>
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
				<SelectMatchOperator condition={props.value} id={props.id} onChange={props.onChange} value='not' />
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
		<SelectMatchOperator condition={props.value} id={props.id} onChange={props.onChange} value={EQUAL_TO} />
		<InputField
			Field={props.inputField}
			id={props.id}
			onChange={props.onChange as Fn<[T]>}
			value={props.value as Maybe<T>}
		/>
	</>;
}

/** @returns a form field to {@link Select} the match operator and {@link Input} the operand to form a {@link Match} condition. */
export function InputMatchStr(props: Omit<Required<CompositeProps<MatchStr>>, 'label'>): React.ReactElement {
	if (props.value === 'any') {
		return <>
			<SelectMatchStrOperator condition={props.value} id={props.id} onChange={props.onChange} value={ANY} />
			<InputString id={props.id} onChange={doNothing} title='' value='' />
		</>;
	}

	if (typeof props.value === 'string') {
		return <>
			<SelectMatchStrOperator condition={props.value} id={props.id} onChange={props.onChange} value={EQUAL_TO} />
			<InputString
				id={props.id}
				onChange={props.onChange as Fn<[string]>}
				title=''
				value={props.value as string}
			/>
		</>;
	}

	const GREATER_THAN = 'contains' in props.value;
	if (GREATER_THAN || 'regex' in props.value) {
		const OPERATOR: MatchStrOperator = GREATER_THAN ? 'contains' : 'regex';
		return <>
			<SelectMatchStrOperator condition={props.value} id={props.id} onChange={props.onChange} value={OPERATOR} />
			<InputString
				id={props.id}
				onChange={value => props.onChange({ [OPERATOR]: value } as MatchStr)}
				title=''
				value={STR_OPERATOR_TO_OPERAND[OPERATOR]!(props.value)}
			/>
		</>;
	}

	const AND = 'and' in props.value;
	if (AND || 'or' in props.value) {
		const OPERATOR = AND ? 'and' : 'or';
		const OPERANDS = (props.value as Record<typeof OPERATOR, MatchStr[]>)[OPERATOR];
		return <>
			<SelectMatchStrOperator condition={props.value} id={props.id} onChange={props.onChange} value={OPERATOR} />
			<BorderLabeledField
				button={{ onClick: () => props.onChange({ [OPERATOR]: [...OPERANDS, ''] } as MatchStr), text: <AddIcon />, }}
				label='Conditions'
			>
				{OPERANDS.map((condition, i) =>
					<BorderLabeledField
						button={OPERANDS.length < 2 ? undefined : {
							onClick: () => props.onChange({ [OPERATOR]: OPERANDS.toSpliced(i, 1) } as MatchStr),
							text: <RemoveIcon />,
						}}
						key={i}
						label={`${i + 1}`}
					>
						<InputMatchStr
							id={`${props.id}--and-${i}`}
							onChange={value => props.onChange({ [OPERATOR]: OPERANDS.with(i, value) } as MatchStr)}
							value={condition}
						/>
					</BorderLabeledField>
				)}
			</BorderLabeledField>
		</>;
	}

	return <>
		<SelectMatchStrOperator condition={props.value} id={props.id} onChange={props.onChange} value='not' />
		<BorderLabeledField label='Operand'>
			<InputMatchStr
				id={`${props.id}--not`}
				onChange={value => props.onChange({ not: value })}
				value={(props.value as Record<'not', MatchStr>).not}
			/>
		</BorderLabeledField>
	</>;
}
