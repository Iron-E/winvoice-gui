'use client';

import React from 'react';
import type { CompositeProps, InputProps } from './props';
import type { Match, MatchStr } from "@/match";
import type { Props, Fn, Maybe, ValueOf } from "@/utils";
import { AddIcon, RemoveIcon } from '@/components';
import {
	ANY,
	EQUAL_TO,
	MATCH_OPERATOR_TO_OPERAND,
	MATCH_STR_OPERATOR_TO_OPERAND,
	SelectMatchOperator,
	SelectMatchStrOperator,
	type MatchOperator,
	type MatchStrOperator,
} from './match/operator';
import { ArrowsRightLeftIcon } from '@heroicons/react/20/solid';
import { BorderLabeledField, GRID } from './border-labeled';
import { FormButton, LABEL_BUTTON_STYLE } from "../button";
import { ICON } from '@/components/css';
import { Input, InputString, Select } from "../field";

export * from './match/department';

/** A react component which can be used to input an operand value for a {@link Match} condition.  */
export type InputMatchField<T> = (p: Omit<InputProps<T>, 'value'> & { value: T }) => React.ReactElement;

/** The 'operands' {@link BorderLabeledField} minimum width style. */
const OPERANDS_BORDER_STYLE = 'min-w-[16.6rem]';

function and_or(and: boolean): ['and' | 'or', 'or' | 'and'] {
	return and ? ['and', 'or'] : ['or', 'and'];
}

/** @returns the `Field` with some defaults used for {@link InputMatch}. */
function InputField<T>(props:
	& { Field: InputMatchField<T> }
	& { [key in 'id' | 'onChange' | 'value']: Parameters<InputMatchField<T>>[0][key] }
	& { [key in 'label']?: Parameters<InputMatchField<T>>[0][key] }
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

/** @returns a customized {@link InputStrField} used for {@link InputMatchStr}. */
function InputStrField(props: Props<typeof InputString>): React.ReactElement {
	return (
		<InputString
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
type InputMatchProps<T> =
	& Required<CompositeProps<T>>
	& { button?: ValueOf<Props<typeof BorderLabeledField>, 'button'> };

/** @returns a form field to {@link Select} the match operator and {@link Input} the operand to form a {@link Match} condition. */
export function InputMatch<T>(props:
	& InputMatchProps<Match<T>>
	& { inputField: InputMatchField<T> }
): React.ReactElement {
	let children: Maybe<React.ReactElement>;

	if (props.value === 'any') {
		children = <SelectMatchOperator condition={props.value} id={props.id} onChange={props.onChange} value={ANY} />;
	} else if (props.value instanceof Object) {
		const AND = 'and' in props.value;
		const GREATER_THAN = 'greater_than' in props.value;

		if (GREATER_THAN || 'less_than' in props.value) {
			const OPERATOR: MatchOperator = GREATER_THAN ? 'greater_than' : 'less_than';
			children = <>
				<SelectMatchOperator condition={props.value} id={props.id} onChange={props.onChange} value={OPERATOR} />
				<InputField
					Field={props.inputField}
					id={props.id}
					onChange={value => props.onChange({ [OPERATOR]: value } as Match<T>)}
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
						onChange={value => props.onChange({ in_range: [value, UPPER] })}
						value={LOWER}
					/>

					<InputField
						Field={props.inputField}
						id={`${props.id}--lt`}
						label='Less than'
						onChange={value => props.onChange({ in_range: [LOWER, value] })}
						value={UPPER}
					/>
				</BorderLabeledField>
			</>;
		} else if (AND || 'or' in props.value) {
			const [OPERATOR, OTHER_OPERATOR] = and_or(AND);
			const OPERANDS = (props.value as Record<typeof OPERATOR, Match<T>[]>)[OPERATOR];
			children = <>
				<SelectMatchOperator
					condition={props.value}
					labelChildren={<>
						<FormButton
							className={LABEL_BUTTON_STYLE}
							onClick={() => props.onChange({ [OTHER_OPERATOR]: OPERANDS } as Match<T>)}
						>
							<ArrowsRightLeftIcon className={ICON} /> Swap
						</FormButton>
					</>}
					id={props.id}
					onChange={props.onChange}
					value={OPERATOR}
				/>

				<BorderLabeledField
					button={{
						onClick: () => props.onChange({ [OPERATOR]: [...OPERANDS, undefined] } as Match<T>),
						text: <AddIcon />,
						// TODO: add 'pull out' button, requires refactoring `borderlabeledfield`
					}}
					className={OPERANDS_BORDER_STYLE}
					label='Conditions'
				>
					{OPERANDS.map((condition, i) =>
						<InputMatch
							button={OPERANDS.length < 2 ? undefined : {
								onClick: () => props.onChange({ [OPERATOR]: OPERANDS.toSpliced(i, 1) } as Match<T>),
								text: <RemoveIcon />,
							}}
							id={`${props.id}--and-${i}`}
							inputField={props.inputField}
							key={i}
							label={`${i + 1}`}
							onChange={value => props.onChange({ [OPERATOR]: OPERANDS.with(i, value) } as Match<T>)}
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
					onChange={value => props.onChange({ not: value } as Match<T>)}
					value={props.value.not as Match<T>}
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
				value={props.value as T}
			/>
		</>}
	</BorderLabeledField>;
}

/** @returns a form field to {@link Select} the match operator and {@link Input} the operand to form a {@link Match} condition. */
export function InputMatchStr(props: InputMatchProps<MatchStr>): React.ReactElement {
	let children: Maybe<React.ReactElement>;

	if (props.value === 'any') {
		children = <SelectMatchStrOperator condition={props.value} id={props.id} onChange={props.onChange} value={ANY} />;
	} else if (typeof props.value === 'string') {
		children = <>
			<SelectMatchStrOperator condition={props.value} id={props.id} onChange={props.onChange} value={EQUAL_TO} />
			<InputStrField
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
				<InputStrField
					id={props.id}
					onChange={value => props.onChange({ [OPERATOR]: value } as MatchStr)}
					title=''
					value={MATCH_STR_OPERATOR_TO_OPERAND[OPERATOR]!(props.value)}
				/>
			</>;
		} else if (AND || 'or' in props.value) {
			const [OPERATOR, OTHER_OPERATOR] = and_or(AND);
			const OPERANDS = (props.value as Record<typeof OPERATOR, MatchStr[]>)[OPERATOR];
			children = <>
				<SelectMatchStrOperator
					condition={props.value}
					labelChildren={undefined /* TODO: extract <FormButton>s above to independent component */}
					id={props.id}
					onChange={props.onChange}
					value={OPERATOR}
				/>

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
