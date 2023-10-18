import type { Children, On } from "@/components/props-with";
import type { Dict, FieldName, Fn } from "@/utils";
import type { Match, MatchOption, MatchSet, MatchStr } from "@/match";
import type { SelectProps } from "../props";
import { FormButton, LABEL_BUTTON_STYLE } from "../../button";
import { ICON } from "@/components/css";
import { NoSymbolIcon } from "@heroicons/react/20/solid";
import { Select } from "../../field";

export type BaseOperator =
	| 'and'
	| 'any'
	| 'equal_to'
	| 'or'
	| 'not'
	;

/** The operators of a {@link Match} condition. */
export type MatchOperator = BaseOperator | `${'greater' | 'less'}_than` | 'in_range';

/** The operators of a {@link MatchOption}. */
export type MatchOptionOperator = 'any' | `none${'' | '_or'}` | 'some';

/** The operators of a {@link MatchSet} condition. */
export type MatchSetOperator = BaseOperator | 'contains';

/** The operators of a {@link Match} condition. */
export type MatchStrOperator = MatchSetOperator | 'regex';

/** A map of operator names to their change handlers. */
type OperatorChangeHandlers<O extends FieldName, M> = Readonly<Record<
	O,
	<T extends M>(handler: Fn<[value: M]>, condition: M, defaultValue: T, operator: O) => void
>>;

/**
 * The base for {@link MATCH_OPERATOR_CHANGE_HANDLERS} and {@link MATCH_STR_OPERATOR_CHANGE_HANDLERS}.
 * HACK: `any` used here because you can't do `<M, T> OperatorChangeHandlers<_, BaseMatch<M, T>>`
 */
const BASE_OPERATOR_CHANGE_HANDLERS: OperatorChangeHandlers<Exclude<BaseOperator, 'equal_to'>, any> = {
	and: (h, c) => h({ and: [c] }),
	any: h => h('any'),
	not: (h, c) => h({ not: c }),
	or: (h, c) => h({ or: [c] }),
};

/**
 * A lookup table for handlers used in {@link handleOperatorChange}.
 * HACK: `any` used here because you can't do `<T> OperatorChangeHandlers<_, Match<T>>`
 */
const MATCH_OPERATOR_CHANGE_HANDLERS: OperatorChangeHandlers<MatchOperator, Match<any>> = {
	...BASE_OPERATOR_CHANGE_HANDLERS as OperatorChangeHandlers<MatchOperator, Match<any>>,
	equal_to: (h, c, d, o) => h(MATCH_OPERATOR_TO_OPERAND[o]?.(c) ?? d),
	greater_than: (h, c, d, o) => h({ greater_than: MATCH_OPERATOR_TO_OPERAND[o]?.(c) ?? d }),
	in_range: (h, c, d, o) => h({ in_range: [MATCH_OPERATOR_TO_OPERAND[o]?.(c) ?? d, d] }),
	less_than: (h, c, d, o) => h({ less_than: MATCH_OPERATOR_TO_OPERAND[o]?.(c) ?? d }),
};

const MATCH_OPTION_OPERATOR_CHANGE_HANDLERS: OperatorChangeHandlers<MatchOptionOperator, MatchOption<any>> = {
	any: BASE_OPERATOR_CHANGE_HANDLERS.any as OperatorChangeHandlers<MatchOptionOperator, MatchOption<any>>['any'],
	none: h => h('none'),
	none_or: (h, c, d, o) => h({ none_or: MATCH_OPTION_OPERATOR_TO_OPERAND[o]?.(c) ?? d }),
	some: (h, c, d, o) => h({ some: MATCH_OPTION_OPERATOR_TO_OPERAND[o]?.(c) ?? d }),
};

const MATCH_SET_OPERATOR_CHANGE_HANDLERS: OperatorChangeHandlers<MatchSetOperator, MatchSet<any>> = {
	...BASE_OPERATOR_CHANGE_HANDLERS as OperatorChangeHandlers<MatchSetOperator, MatchSet<any>>,
	contains: (h, c, d, o) => h({ contains: MATCH_SET_OPERATOR_TO_OPERAND[o]?.(c) ?? d }),
};

const MATCH_STR_OPERATOR_CHANGE_HANDLERS: OperatorChangeHandlers<MatchStrOperator, MatchStr> = {
	...BASE_OPERATOR_CHANGE_HANDLERS as OperatorChangeHandlers<MatchStrOperator, MatchStr>,
	equal_to: (h, c, d, o) => h(MATCH_STR_OPERATOR_TO_OPERAND[o]?.(c) ?? d),
	contains: (h, c, d, o) => h({ contains: MATCH_STR_OPERATOR_TO_OPERAND[o]?.(c) ?? d as string }),
	regex: (h, c, d, o) => h({ regex: MATCH_STR_OPERATOR_TO_OPERAND[o]?.(c) ?? d as string }),
};

/*
 * The base for {@link MATCH_OPERATOR_TO_OPERAND} and {@link MATCH_STR_OPERATOR_TO_OPERAND}.
 * HACK: `any` used here because you can't do `<T, U> Dict<_, (_: T) => U>`
 */
const BASE_OPERATOR_TO_OPERAND: Dict<BaseOperator, (condition: any) => any> = {
	equal_to: c => c,
};

/** A lookup table for handlers used in {@link handleOperatorChange}. */
/** Maps a condition's {@link MatchOperator | operator} to an instruction which will extract the operand. */
export const MATCH_OPERATOR_TO_OPERAND: Dict<MatchOperator, <T>(condition: Match<T>) => T> = {
	...BASE_OPERATOR_TO_OPERAND,
	greater_than: c => (c as Record<'greater_than', any>).greater_than,
	in_range: c => (c as Record<'in_range', any>).in_range[0],
	less_than: c => (c as Record<'less_than', any>).less_than,
};

/** Maps a condition's {@link MatchOperator | operator} to an instruction which will extract the operand. */
export const MATCH_OPTION_OPERATOR_TO_OPERAND: Dict<MatchOptionOperator, <T>(condition: MatchOption<T>) => T> = {
	none_or: c => (c as Record<'none_or', any>).none_or,
	some: c => (c as Record<'some', any>).some,
};

/** Maps a condition's {@link MatchOperator | operator} to an instruction which will extract the operand. */
const MATCH_SET_OPERATOR_TO_OPERAND: Dict<MatchStrOperator, <T>(condition: MatchSet<T>) => T> = {
	...BASE_OPERATOR_TO_OPERAND,
	contains: c => (c as Record<'contains', any>).contains,
};

/** Maps a condition's {@link MatchOperator | operator} to an instruction which will extract the operand. */
export const MATCH_STR_OPERATOR_TO_OPERAND: Dict<MatchStrOperator, (condition: MatchStr) => string> = {
	...MATCH_SET_OPERATOR_TO_OPERAND as Dict<MatchStrOperator, (condition: MatchStr) => string>,
	regex: c => (c as Record<'regex', string>).regex,
};

/** The options used for both {@link MATCH_OPTIONS} and {@link MATCH_STR_OPTIONS}.*/
const BASE_OPTIONS: readonly React.ReactElement[] = [
	<option key='and' value='and'>And</option>,
	<option key='any' value='any'>Any</option>,
	<option key='equal_to' value='equal_to'>Equal to</option>,
	<option key='not' value='not'>Not</option>,
	<option key='or' value='or'>Or</option>,
];

/** Compare elements by their keys. */
function compareElementKeys(a: React.ReactElement, b: React.ReactElement) {
	return a.key! < b.key! ? -1 : 1;
}

/** A map of values from the valid strings which are accepted by `<option>.value` to valid {@link MatchOperator}. */
/** The `<options>` for {@link SelectMatchOperator}. */
const MATCH_OPTIONS: readonly React.ReactElement[] = [
	...BASE_OPTIONS,
	<option key='greater_than' value='greater_than'>Greater than</option>,
	<option key='in_range' value='in_range'>In Range</option>,
	<option key='less_than' value='less_than'>Less than</option>,
].sort(compareElementKeys);

/** A map of values from the valid strings which are accepted by `<option>.value` to valid {@link MatchOperator}. */
/** The `<options>` for {@link SelectMatchOperator}. */
const MATCH_OPTION_OPTIONS: readonly React.ReactElement[] = [
	<option key='any' value='any'>Any</option>,
	<option key='none' value='none'>None</option>,
	<option key='none_or' value='none_or'>None, Or Some</option>,
	<option key='some' value='some'>Some</option>,
].sort(compareElementKeys);

/** The `<options>` for {@link SelectMatchOperator}. */
const MATCH_SET_OPTIONS: readonly React.ReactElement[] = [
	...BASE_OPTIONS,
	<option key='contains' value='contains'>Contains</option>,
].sort(compareElementKeys);

/** The `<options>` for {@link SelectMatchOperator}. */
const MATCH_STR_OPTIONS: readonly React.ReactElement[] = [
	...MATCH_SET_OPTIONS,
	<option key='regex' value='regex'>Regex</option>,
];

/** Properties of aggregates of {@link SelectOperator}. */
type Props<O, M> =
	& Omit<SelectProps<O>, 'onChange' | 'title' | 'value'>
	& Required<On<'change', [condition: M]>>
	& { condition: M, value: O }
	;

/** A selector for the current 'variant' (e.g. 'and', 'any') of the {@link Match} condition. */
function SelectOperator<O extends string | symbol, M, T extends M>(props: Props<O, M> & Required<Children> & {
	defaultCondition: T,
	operatorChangeHandlers: OperatorChangeHandlers<O, M>,
}): React.ReactElement {
	function handleChange(value: string): void {
		props.operatorChangeHandlers[value as O](
			props.onChange,
			props.condition,
			props.defaultCondition,
			props.value,
		);
	}

	return (
		<Select
			id={`${props.id}--operator`}
			label='Operator'
			labelChildren={<>
				{props.value === 'not'
					? <FormButton
						className={LABEL_BUTTON_STYLE}
						onClick={() => props.onChange((props.condition as Record<'not', any>).not)}
					>
						<NoSymbolIcon className={ICON} /> Negate
					</FormButton>
					: undefined
				}
				{props.labelChildren}
			</>}
			onChange={handleChange}
			title='The type of condition which is applied to the Operand'
			value={typeof props.value === 'symbol' ? props.value.description! : props.value}
		>
			{props.children}
		</Select>
	);
}

/** A selector for the current 'variant' (e.g. 'and', 'any') of the {@link Match} condition. */
export function SelectMatchOperator<T>(props: Props<MatchOperator, Match<T>> & {
	defaultCondition: T,
}): React.ReactElement {
	return (
		<SelectOperator {...props} operatorChangeHandlers={MATCH_OPERATOR_CHANGE_HANDLERS}>
			{MATCH_OPTIONS}
		</SelectOperator>
	);
}

/** A selector for the current 'variant' (e.g. 'and', 'any') of the {@link Match} condition. */
export function SelectMatchOptionOperator<T>(props: Props<MatchOptionOperator, MatchOption<T>>): React.ReactElement {
	return (
		<SelectOperator {...props} defaultCondition='any' operatorChangeHandlers={MATCH_OPTION_OPERATOR_CHANGE_HANDLERS}>
			{MATCH_OPTION_OPTIONS}
		</SelectOperator>
	);
}

/** A selector for the current 'operator' (e.g. 'and', 'any') of the {@link MatchStr} condition. */
export function SelectMatchSetOperator<T>(props: Props<MatchSetOperator, MatchSet<T>>): React.ReactElement {
	return (
		<SelectOperator {...props} defaultCondition='any' operatorChangeHandlers={MATCH_SET_OPERATOR_CHANGE_HANDLERS}>
			{MATCH_SET_OPTIONS}
		</SelectOperator>
	);
}

/** A selector for the current 'operator' (e.g. 'and', 'any') of the {@link MatchStr} condition. */
export function SelectMatchStrOperator(props: Props<MatchStrOperator, MatchStr>): React.ReactElement {
	return (
		<SelectOperator {...props} defaultCondition='' operatorChangeHandlers={MATCH_STR_OPERATOR_CHANGE_HANDLERS}>
			{MATCH_STR_OPTIONS}
		</SelectOperator>
	);
}
