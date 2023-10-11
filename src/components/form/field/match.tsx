'use client';

import React from 'react';
import type { CompositeProps, InputProps } from './props';
import type { Match, MatchStr } from "@/match";
import {
	ANY,
	EQUAL_TO,
	MATCH_OPERATOR_TO_OPERAND,
	MATCH_STR_OPERATOR_TO_OPERAND,
	SelectMatchOperator,
	SelectMatchStrOperator,
	type MatchOperator,
	type MatchStrOperator,
	type MayMatch,
} from './match/operator';
import { BorderLabeledField, GRID } from './border-labeled';
import type { Props, Fn, Maybe, ValueOf } from "@/utils";
import { Input, InputString, Select } from "../field";
import { AddIcon, RemoveIcon } from '@/components';

/** A react component which can be used to input an operand value for a {@link Match} condition.  */
type InputComponent<T> = (p: Omit<InputProps<T>, 'value'> & { value?: T }) => React.ReactElement;

/** The 'operands' {@link BorderLabeledField} minimum width style. */
const OPERANDS_BORDER_STYLE = 'min-w-[16.6rem]';

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

/** Properties of components used for inputting {@link Match} / {@link MatchStr} conditions. */
type InputMatchProps<T, CompositePropsRequired extends boolean = false> =
	& (CompositePropsRequired extends true ? Required<CompositeProps<T>> : CompositeProps<T>)
	& { button?: ValueOf<Props<typeof BorderLabeledField>, 'button'> };

/** @returns a form field to {@link Select} the match operator and {@link Input} the operand to form a {@link Match} condition. */
export function InputMatch<T>(props:
	& InputMatchProps<MayMatch<T>>
	& { inputField: InputComponent<T> }
): React.ReactElement {
	let children: Maybe<React.ReactElement>;

	if (props.value === 'any') {
		children = <SelectMatchOperator condition={props.value} id={props.id} onChange={props.onChange} value={ANY} />;
	} else if (typeof props.value === 'object') {
		const AND = 'and' in props.value;
		const GREATER_THAN = 'greater_than' in props.value;

		if (GREATER_THAN || 'less_than' in props.value) {
			const OPERATOR: MatchOperator = GREATER_THAN ? 'greater_than' : 'less_than';
			children = <>
				<SelectMatchOperator condition={props.value} id={props.id} onChange={props.onChange} value={OPERATOR} />
				<InputField
					Field={props.inputField}
					id={props.id}
					onChange={value => props.onChange({ [OPERATOR]: value } as MayMatch<T>)}
					value={MATCH_OPERATOR_TO_OPERAND[OPERATOR]!(props.value)}
				/>
			</>;
		} else if ('in_range' in props.value) {
			const [LOWER, UPPER] = props.value.in_range;
			children = <>
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
		} else if (AND || 'or' in props.value) {
			const OPERATOR = AND ? 'and' : 'or';
			const OPERANDS = (props.value as Record<typeof OPERATOR, MayMatch<T>[]>)[OPERATOR];
			children = <>
				<SelectMatchOperator condition={props.value} id={props.id} onChange={props.onChange} value={OPERATOR} />
				<BorderLabeledField
					button={{
						onClick: () => props.onChange({ [OPERATOR]: [...OPERANDS, undefined] } as MayMatch<T>),
						text: <AddIcon />,
					}}
					className={OPERANDS_BORDER_STYLE}
					label='Conditions'
				>
					{OPERANDS.map((condition, i) =>
						<InputMatch
							button={OPERANDS.length < 2 ? undefined : {
								onClick: () => props.onChange({ [OPERATOR]: OPERANDS.toSpliced(i, 1) } as MayMatch<T>),
								text: <RemoveIcon />,
							}}
							id={`${props.id}--and-${i}`}
							inputField={props.inputField}
							key={i}
							label={`${i + 1}`}
							onChange={value => props.onChange({ [OPERATOR]: OPERANDS.with(i, value) } as MayMatch<T>)}
							value={condition}
						/>
					)}
				</BorderLabeledField>
			</>;
		} else if ('not' in props.value) {
			children = <>
				<SelectMatchOperator condition={props.value} id={props.id} onChange={props.onChange} value='not' />
				<InputMatch
					id={`${props.id}--not`}
					inputField={props.inputField}
					label='Operand'
					onChange={value => props.onChange({ not: value })}
					value={props.value.not}
				/>
			</>;
		}
	}

	return <BorderLabeledField button={props.button} label={props.label}>
		{children ?? <>
			<SelectMatchOperator condition={props.value} id={props.id} onChange={props.onChange} value={EQUAL_TO} />
			<InputField
				Field={props.inputField}
				id={props.id}
				onChange={props.onChange as Fn<[T]>}
				value={props.value as Maybe<T>}
			/>
		</>}
	</BorderLabeledField>;
}

/** @returns a form field to {@link Select} the match operator and {@link Input} the operand to form a {@link Match} condition. */
export function InputMatchStr(props: InputMatchProps<MatchStr, true>): React.ReactElement {
	let children: Maybe<React.ReactElement>;

	if (props.value === 'any') {
		children = <SelectMatchStrOperator condition={props.value} id={props.id} onChange={props.onChange} value={ANY} />;
	} else if (typeof props.value === 'string') {
		children = <>
			<SelectMatchStrOperator condition={props.value} id={props.id} onChange={props.onChange} value={EQUAL_TO} />
			<InputString
				id={props.id}
				onChange={props.onChange as Fn<[string]>}
				title=''
				value={props.value as string}
			/>
		</>;
	} else {
		const AND = 'and' in props.value;
		const GREATER_THAN = 'contains' in props.value;
		if (GREATER_THAN || 'regex' in props.value) {
			const OPERATOR: MatchStrOperator = GREATER_THAN ? 'contains' : 'regex';
			children = <>
				<SelectMatchStrOperator condition={props.value} id={props.id} onChange={props.onChange} value={OPERATOR} />
				<InputString
					id={props.id}
					onChange={value => props.onChange({ [OPERATOR]: value } as MatchStr)}
					title=''
					value={MATCH_STR_OPERATOR_TO_OPERAND[OPERATOR]!(props.value)}
				/>
			</>;
		} else if (AND || 'or' in props.value) {
			const OPERATOR = AND ? 'and' : 'or';
			const OPERANDS = (props.value as Record<typeof OPERATOR, MatchStr[]>)[OPERATOR];
			children = <>
				<SelectMatchStrOperator condition={props.value} id={props.id} onChange={props.onChange} value={OPERATOR} />
				<BorderLabeledField
					button={{ onClick: () => props.onChange({ [OPERATOR]: [...OPERANDS, ''] } as MatchStr), text: <AddIcon /> }}
					className={OPERANDS_BORDER_STYLE}
					label='Conditions'
				>
					{OPERANDS.map((condition, i) =>
						<InputMatchStr
							button={OPERANDS.length < 2 ? undefined : {
								onClick: () => props.onChange({ [OPERATOR]: OPERANDS.toSpliced(i, 1) } as MatchStr),
								text: <RemoveIcon />,
							}}
							id={`${props.id}--and-${i}`}
							key={i}
							label={`${i + 1}`}
							onChange={value => props.onChange({ [OPERATOR]: OPERANDS.with(i, value) } as MatchStr)}
							value={condition}
						/>
					)}
				</BorderLabeledField>
			</>;
		} else {
			children = <>
				<SelectMatchStrOperator condition={props.value} id={props.id} onChange={props.onChange} value='not' />
				<InputMatchStr
					id={`${props.id}--not`}
					label='Operand'
					onChange={value => props.onChange({ not: value })}
					value={(props.value as Record<'not', MatchStr>).not}
				/>
			</>;
		}
	}

	return <BorderLabeledField button={props.button} label={props.label}>
		{children}
	</BorderLabeledField>;
}
