import React from 'react';
import type { CompositeProps, InputProps } from './props';
import type { Match, MatchOption, MatchSet, MatchStr } from "@/match";
import type { Props, Fn, Maybe, ValueOf } from "@/utils";
import { AddIcon, RemoveIcon } from '@/components';
import { ArrowUpIcon, ArrowsRightLeftIcon } from '@heroicons/react/20/solid';
import { BorderLabeledField, GRID } from './border-labeled';
import { FormButton, LABEL_BUTTON_STYLE } from "../button";
import { ICON } from '@/components/css';
import { Input, InputString, Select } from "../field";
import {
	MATCH_OPERATOR_TO_OPERAND,
	MATCH_OPTION_OPERATOR_TO_OPERAND,
	MATCH_STR_OPERATOR_TO_OPERAND,
	SelectMatchOperator,
	SelectMatchOptionOperator,
	SelectMatchSetOperator,
	SelectMatchStrOperator,
	type MatchOperator,
	type MatchStrOperator,
} from './match/operator';

export * from './match/contact';
export * from './match/department';
export * from './match/employee';
export * from './match/expense';
export * from './match/job';
export * from './match/location';
export * from './match/organization';
export * from './match/role';
export * from './match/timesheet';
export * from './match/user';

/** A react component which can be used to input an operand value for a {@link Match} condition.  */
export type InputMatchField<T> = (p: Omit<InputProps<T>, 'value'> & { value: T }) => React.ReactElement;

/** The 'operands' {@link BorderLabeledField} minimum width style. */
const OPERANDS_BORDER_STYLE = 'min-w-[16.6rem]';

function and_or(and: boolean): ['and' | 'or', 'or' | 'and'] {
	return and ? ['and', 'or'] : ['or', 'and'];
}

/** @returns a {@link BorderLabeledField | button} for adding an additional value to a `{['and | 'or']: […]}` condition. */
function addButton<M>(
	handleClick: Fn<[condition: M]>,
	operator: 'and' | 'or',
	operands: 'any' extends M ? M[] : never,
): ValueOf<Props<typeof BorderLabeledField>, 'button'> {
	return {
		onClick: () => handleClick({ [operator]: [...operands, 'any'] } as M),
		text: <AddIcon />
	};
}

/** @returns a {@link BorderLabeledField | button} for removing the selected value from a `{['and | 'or']: […]}` condition. */
function operandsButtons<M>(
	handleClick: Fn<[condition: M]>,
	operator: 'and' | 'or',
	operands: 'any' extends M ? M[] : never,
	index: number,
): Props<typeof BorderLabeledField>['button'] {
	const PULL_UP = {
		onClick: () => handleClick(operands[index] as M),
		text: <><ArrowUpIcon className={ICON} /> Pull Up</>,
	};

	return operands.length < 2 ? PULL_UP : [PULL_UP, {
		onClick: () => handleClick({ [operator]: operands.toSpliced(index, 1) } as M),
		text: <RemoveIcon />,
	}];
}

function swapButton<M>(
	handleClick: Fn<[condition: M]>,
	operator: 'and' | 'or',
	operands: 'any' extends M ? M[] : never,
): React.ReactElement {
	return (
		<FormButton className={LABEL_BUTTON_STYLE} onClick={() => handleClick({ [operator]: operands } as M)}>
			<ArrowsRightLeftIcon className={ICON} /> Swap
		</FormButton>
	);
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
export type InputMatchProps<T> =
	& Omit<Required<CompositeProps<T>>, 'label'>
	& {
		button?: ValueOf<Props<typeof BorderLabeledField>, 'button'>,
		label?: ValueOf<CompositeProps<T>, 'label'>,
	};

/** @returns a form field to {@link Select} the match operator and {@link Input} the operand to form a {@link Match} condition. */
export function InputMatch<T>(props: InputMatchProps<Match<T>> & {
	defaultValue: T,
	inputField: InputMatchField<T>,
}): React.ReactElement {
	let children: Maybe<React.ReactElement>;

	if (props.value === 'any') {
		children = <SelectMatchOperator
			condition={props.value}
			defaultCondition={props.defaultValue}
			id={props.id}
			onChange={props.onChange}
			value='any'
		/>;
	} else if (props.value instanceof Object) {
		const AND = 'and' in props.value;
		const GREATER_THAN = 'greater_than' in props.value;

		if (GREATER_THAN || 'less_than' in props.value) {
			const OPERATOR: MatchOperator = GREATER_THAN ? 'greater_than' : 'less_than';
			children = <>
				<SelectMatchOperator
					condition={props.value}
					defaultCondition={props.defaultValue}
					id={props.id}
					onChange={props.onChange}
					value={OPERATOR}
				/>

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
				<SelectMatchOperator
					condition={props.value}
					defaultCondition={props.defaultValue}
					id={props.id}
					onChange={props.onChange}
					value='in_range'
				/>

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
					defaultCondition={props.defaultValue}
					labelChildren={swapButton(props.onChange, OTHER_OPERATOR, OPERANDS)}
					id={props.id}
					onChange={props.onChange}
					value={OPERATOR}
				/>

				<BorderLabeledField
					button={addButton(props.onChange, OPERATOR, OPERANDS)}
					className={OPERANDS_BORDER_STYLE}
					label='Conditions'
				>
					{OPERANDS.map((condition, i) =>
						<InputMatch
							button={operandsButtons(props.onChange, OPERATOR, OPERANDS, i)}
							defaultValue={props.defaultValue}
							id={`${props.id}--and-${i}`}
							inputField={props.inputField}
							key={i}
							label={`${i + 1}`}
							onChange={value => props.onChange({ [OPERATOR]: OPERANDS.with(i, value ?? 'any') } as Match<T>)}
							value={condition}
						/>
					)}
				</BorderLabeledField>
			</>;
		} else if ('not' in props.value) {
			children = <>
				<SelectMatchOperator
					condition={props.value}
					defaultCondition={props.defaultValue}
					id={props.id}
					onChange={props.onChange}
					value='not'
				/>

				<InputMatch
					defaultValue={props.defaultValue}
					id={`${props.id}--not`}
					inputField={props.inputField}
					label='Operand'
					onChange={value => props.onChange({ not: value ?? 'any' })}
					value={props.value.not as Match<T>}
				/>
			</>;
		}
	}

	return <BorderLabeledField button={props.button} label={props.label}>
		{children ?? <>
			<SelectMatchOperator
				condition={props.value}
				defaultCondition={props.defaultValue}
				id={props.id}
				onChange={props.onChange}
				value='equal_to'
			/>

			<InputField
				Field={props.inputField}
				id={props.id}
				onChange={props.onChange as Fn<[value: T]>}
				value={props.value as T}
			/>
		</>}
	</BorderLabeledField>;
}

/** @returns a form field to {@link Select} the match operator and {@link Input} the operand to form a {@link MatchOption} condition. */
export function InputMatchOption<T>(props: InputMatchProps<MatchOption<T>> & {
	inputField: InputMatchField<T>,
}): React.ReactElement {
	let children: React.ReactElement;

	const ANY = props.value === 'any';
	if (ANY || props.value === 'none') {
		children = <SelectMatchOptionOperator
			condition={props.value}
			id={props.id}
			onChange={props.onChange}
			value={ANY ? 'any' : 'none'}
		/>;
	} else {
		const OPERATOR = 'none_or' in (props.value as Exclude<MatchOption<T>, 'any' | 'none'>) ? 'none_or' : 'some';
		children = <>
			<SelectMatchOptionOperator condition={props.value} id={props.id} onChange={props.onChange} value={OPERATOR} />
			<InputField
				Field={props.inputField}
				id={props.id}
				onChange={value => props.onChange({ [OPERATOR]: value } as MatchOption<T>)}
				value={MATCH_OPTION_OPERATOR_TO_OPERAND[OPERATOR]!(props.value)}
			/>
		</>;
	}

	return <BorderLabeledField button={props.button} label={props.label}>
		{children}
	</BorderLabeledField>;
}

/** @returns a form field to {@link Select} the match operator and {@link Input} the operand to form a {@link MatchSet} condition. */
export function InputMatchSet<T>(props: InputMatchProps<MatchSet<T>> & {
	inputField: InputMatchField<T>,
}): React.ReactElement {
	let children: React.ReactElement;

	if (props.value === 'any') {
		children = <SelectMatchSetOperator condition={props.value} id={props.id} onChange={props.onChange} value='any' />;
	} else {
		const AND = 'and' in props.value;
		if ('contains' in props.value) {
			children = <>
				<SelectMatchSetOperator condition={props.value} id={props.id} onChange={props.onChange} value='contains' />
				<InputField
					Field={props.inputField}
					id={props.id}
					onChange={value => props.onChange({ contains: value })}
					value={props.value.contains}
				/>
			</>;
		} else if (AND || 'or' in props.value) {
			const [OPERATOR, OTHER_OPERATOR] = and_or(AND);
			const OPERANDS = (props.value as Record<typeof OPERATOR, MatchSet<T>[]>)[OPERATOR];
			children = <>
				<SelectMatchSetOperator
					condition={props.value}
					labelChildren={swapButton(props.onChange, OTHER_OPERATOR, OPERANDS)}
					id={props.id}
					onChange={props.onChange}
					value={OPERATOR}
				/>

				<BorderLabeledField
					button={addButton(props.onChange, OPERATOR, OPERANDS)}
					className={OPERANDS_BORDER_STYLE}
					label='Conditions'
				>
					{OPERANDS.map((condition, i) =>
						<InputMatchSet
							button={operandsButtons(props.onChange, OPERATOR, OPERANDS, i)}
							id={`${props.id}--and-${i}`}
							inputField={props.inputField}
							key={i}
							label={`${i + 1}`}
							onChange={value => props.onChange({ [OPERATOR]: OPERANDS.with(i, value) } as MatchSet<T>)}
							value={condition}
						/>
					)}
				</BorderLabeledField>
			</>;
		} else {
			children = <>
				<SelectMatchSetOperator condition={props.value} id={props.id} onChange={props.onChange} value='not' />
				<InputMatchSet
					id={`${props.id}--not`}
					inputField={props.inputField}
					label='Operand'
					onChange={value => props.onChange({ not: value })}
					value={(props.value as Record<'not', MatchSet<T>>).not}
				/>
			</>;
		}
	}

	return <BorderLabeledField button={props.button} label={props.label}>
		{children}
	</BorderLabeledField>;
}

/** @returns a form field to {@link Select} the match operator and {@link Input} the operand to form a {@link MatchStr} condition. */
export function InputMatchStr(props: InputMatchProps<MatchStr>): React.ReactElement {
	let children: Maybe<React.ReactElement>;

	if (props.value === 'any') {
		children = <SelectMatchStrOperator condition={props.value} id={props.id} onChange={props.onChange} value='any' />;
	} else if (typeof props.value === 'string') {
		children = <>
			<SelectMatchStrOperator condition={props.value} id={props.id} onChange={props.onChange} value='equal_to' />
			<InputStrField
				id={props.id}
				onChange={props.onChange as Fn<[value: string]>}
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
					labelChildren={swapButton(props.onChange, OTHER_OPERATOR, OPERANDS)}
					id={props.id}
					onChange={props.onChange}
					value={OPERATOR}
				/>

				<BorderLabeledField
					button={addButton(
						props.onChange,
						OPERATOR,
						OPERANDS,
					)}
					className={OPERANDS_BORDER_STYLE}
					label='Conditions'
				>
					{OPERANDS.map((condition, i) =>
						<InputMatchStr
							button={operandsButtons(props.onChange, OPERATOR, OPERANDS, i)}
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
