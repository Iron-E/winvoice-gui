import type { Children, On } from "@/components/props-with";
import type { Dict, FieldName, Fn, Maybe } from "@/utils";
import type { Match, MatchStr } from "@/match";
import type { SelectProps } from "../props";
import { FormButton, LABEL_BUTTON_STYLE } from "../../button";
import { Select } from "../../field";
import { NoSymbolIcon } from "@heroicons/react/20/solid";
import { ICON } from "@/components/css";

export type BaseOperator =
	| 'and'
	| typeof ANY
	| typeof EQUAL_TO
	| 'or'
	| 'not'
	;

/** The operators of a {@link Match} condition. */
export type MatchOperator = BaseOperator | `${'greater' | 'less'}_than` | 'in_range';

/** The operators of a {@link Match} condition. */
export type MatchStrOperator = BaseOperator | 'contains' | 'regex';

/** {@link Match}es {@link Maybe<T>}. */
export type MayMatch<T> = Match<Maybe<T>>;

/** A map of operator names to their change handlers. */
type OperatorChangeHandlers<O extends FieldName, M> = Readonly<Record<
	O,
	(handler: Fn<[value: M]>, condition: M, operator: O) => void
>>;

/**
 * The `any` operator.
 * Is a {@link Symbol} rather than a string because it has different storage than other operators of a {@link Match}.
 */
export const ANY = Symbol('any');

/**
 * The `equal_to` operator.
 * Is a {@link Symbol} rather than a string because it has different storage than other operators of a {@link Match}.
 */
export const EQUAL_TO = Symbol('equal_to');

/**
 * The base for {@link MATCH_OPERATOR_CHANGE_HANDLERS} and {@link MATCH_STR_OPERATOR_CHANGE_HANDLERS}.
 * HACK: `any` used here because you can't do `<M, T> OperatorChangeHandlers<_, BaseMatch<M, T>>`
 */
const BASE_OPERATOR_CHANGE_HANDLERS: OperatorChangeHandlers<
	Exclude<BaseOperator, typeof EQUAL_TO>,
	any
> = {
	and: (h, c) => h({ and: [c] }),
	[ANY]: h => h('any'),
	not: (h, c) => h({ not: c }),
	or: (h, c) => h({ or: [c] }),
};

/**
 * A lookup table for handlers used in {@link handleOperatorChange}.
 * HACK: `any` used here because you can't do `<T> OperatorChangeHandlers<_, MayMatch<T>>`
 */
const MATCH_OPERATOR_CHANGE_HANDLERS: OperatorChangeHandlers<MatchOperator, MayMatch<any>> = {
	...BASE_OPERATOR_CHANGE_HANDLERS as OperatorChangeHandlers<MatchOperator, MayMatch<any>>,
	[EQUAL_TO]: (h, c, o) => h(MATCH_OPERATOR_TO_OPERAND[o]?.(c)),
	greater_than: (h, c, o) => h({ greater_than: MATCH_OPERATOR_TO_OPERAND[o]?.(c) }),
	in_range: (h, c, o) => h({ in_range: [MATCH_OPERATOR_TO_OPERAND[o]?.(c), undefined] }),
	less_than: (h, c, o) => h({ less_than: MATCH_OPERATOR_TO_OPERAND[o]?.(c) }),
};

const MATCH_STR_OPERATOR_CHANGE_HANDLERS: OperatorChangeHandlers<MatchStrOperator, MatchStr> = {
	...BASE_OPERATOR_CHANGE_HANDLERS as OperatorChangeHandlers<MatchStrOperator, MatchStr>,
	[EQUAL_TO]: (h, c, o) => h(MATCH_STR_OPERATOR_TO_OPERAND[o]?.(c) ?? ''),
	contains: (h, c, o) => h({ contains: MATCH_STR_OPERATOR_TO_OPERAND[o]?.(c) ?? '' }),
	regex: (h, c, o) => h({ regex: MATCH_STR_OPERATOR_TO_OPERAND[o]?.(c) ?? '' }),
};

/*
 * The base for {@link MATCH_OPERATOR_TO_OPERAND} and {@link MATCH_STR_OPERATOR_TO_OPERAND}.
 */
const BASE_OPERATOR_TO_OPERAND: Dict<BaseOperator, <T, U extends T>(condition: T) => U> = {
	[EQUAL_TO]: <T, U>(c: T) => c! as U,
};

/** A lookup table for handlers used in {@link handleOperatorChange}. */
/** Maps a condition's {@link MatchOperator | operator} to an instruction which will extract the operand. */
export const MATCH_OPERATOR_TO_OPERAND: Dict<MatchOperator, <T>(condition: MayMatch<T>) => Maybe<T>> = {
	...BASE_OPERATOR_TO_OPERAND,
	greater_than: c => (c as Record<'greater_than', any>).greater_than,
	in_range: c => (c as Record<'in_range', any>).in_range[0],
	less_than: c => (c as Record<'less_than', any>).less_than,
};

/** Maps a condition's {@link MatchOperator | operator} to an instruction which will extract the operand. */
export const MATCH_STR_OPERATOR_TO_OPERAND: Dict<MatchStrOperator, (condition: MatchStr) => string> = {
	...BASE_OPERATOR_TO_OPERAND,
	contains: c => (c as Record<'contains', string>).contains,
	regex: c => (c as Record<'regex', string>).regex,
};

/** The options used for both {@link MATCH_OPTIONS} and {@link MATCH_STR_OPTIONS}.*/
const BASE_OPTIONS: readonly React.ReactElement[] = [
	<option key='and' value='and'>And</option>,
	<option key={ANY.description} value={ANY.description}>Any</option>,
	<option key={EQUAL_TO.description} value={EQUAL_TO.description}>Equal to</option>,
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

/** The `<options>` for {@link SelectMatchOperator}. */
const MATCH_STR_OPTIONS: readonly React.ReactElement[] = [
	...BASE_OPTIONS,
	<option key='contains' value='contains'>Contains</option>,
	<option key='regex' value='regex'>Regex</option>,
].sort(compareElementKeys);

/**
 * In an `<option>.value`, a {@link Symbol} may be represented by its `description`. This mapping returns said
 * description back to its original form.
 */
const SYMBOL_DESC_MAP: Dict<string, typeof ANY | typeof EQUAL_TO> = {
	[ANY.description!]: ANY,
	[EQUAL_TO.description!]: EQUAL_TO,
}

/** A selector for the current 'variant' (e.g. 'and', 'any') of the {@link Match} condition. */
function SelectOperator<O extends string | symbol, M>(props:
	& Omit<SelectProps<O>, 'onChange' | 'title' | 'value'>
	& Required<Children & On<'change', [M]>>
	& {
		condition: M,
		operatorChangeHandlers: OperatorChangeHandlers<O, M>,
		value: O,
	}
): React.ReactElement {
	function handleChange(value: string): void {
		props.operatorChangeHandlers[(SYMBOL_DESC_MAP[value] ?? value) as O](
			props.onChange,
			props.condition,
			props.value
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

/** Properties of aggregates of {@link SelectOperator}. */
type Props<O, M> =
	& Omit<SelectProps<O>, 'onChange' | 'title' | 'value'>
	& Required<On<'change', [M]>>
	& { condition: M, value: O }
	;

/** A selector for the current 'variant' (e.g. 'and', 'any') of the {@link Match} condition. */
export function SelectMatchOperator<T>(props: Props<MatchOperator, MayMatch<T>>): React.ReactElement {
	return (
		<SelectOperator {...props} operatorChangeHandlers={MATCH_OPERATOR_CHANGE_HANDLERS}>
			{MATCH_OPTIONS}
		</SelectOperator>
	);
}

/** A selector for the current 'operator' (e.g. 'and', 'any') of the {@link MatchStr} condition. */
export function SelectMatchStrOperator(props: Props<MatchStrOperator, MatchStr>): React.ReactElement {
	return (
		<SelectOperator {...props} operatorChangeHandlers={MATCH_STR_OPERATOR_CHANGE_HANDLERS}>
			{MATCH_STR_OPTIONS}
		</SelectOperator>
	);
}
