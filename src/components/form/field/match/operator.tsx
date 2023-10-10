import type { Dict, FieldName, Fn, Maybe } from "@/utils";
import type { Match, MatchStr } from "@/match";
import type { Children, On } from "@/components/props-with";
import type { SelectProps } from "../props";
import { Select } from "../../field";

/** The operators of a {@link Match} condition. */
export type MatchOperator =
	| 'and'
	| typeof ANY
	| typeof EQUAL_TO
	| 'or'
	| `${'greater' | 'less'}_than`
	| 'in_range'
	| 'not'
	;

/** The operators of a {@link Match} condition. */
export type MatchStrOperator =
	| 'and'
	| typeof ANY
	| 'contains'
	| typeof EQUAL_TO
	| 'not'
	| 'or'
	| 'regex'
	;

/** {@link Match}es {@link Maybe<T>}. */
export type MayMatch<T> = Match<Maybe<T>>;

/** A map of operator names to their change handlers. */
type OperatorChangeHandlers<M, O extends FieldName> = Readonly<Record<
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
 * A lookup table for handlers used in {@link handleOperatorChange}.
 * HACK: `any` used here because you can't do `<T> OperatorChangeHandlers<MayMatch<T>, MatchOperator>`
 */
const OPERATOR_CHANGE_HANDLERS: OperatorChangeHandlers<MayMatch<any>, MatchOperator> = {
	and: (h, c) => h({ and: [c] }),
	[ANY]: h => h('any'),
	[EQUAL_TO]: (h, c, o) => h(OPERATOR_TO_OPERAND[o]?.(c)),
	greater_than: (h, c, o) => h({ greater_than: OPERATOR_TO_OPERAND[o]?.(c) }),
	in_range: (h, c, o) => h({ in_range: [OPERATOR_TO_OPERAND[o]?.(c), undefined] }),
	less_than: (h, c, o) => h({ less_than: OPERATOR_TO_OPERAND[o]?.(c) }),
	not: (h, c) => h({ not: c }),
	or: (h, c) => h({ or: [c] }),
};

/** A lookup table for handlers used in {@link handleOperatorChange}. */
/** Maps a condition's {@link MatchOperator | operator} to an instruction which will extract the operand. */
export const OPERATOR_TO_OPERAND: Dict<MatchOperator, <T>(condition: MayMatch<T>) => Maybe<T>> = {
	[EQUAL_TO]: <T,>(c: MayMatch<T>) => c as Maybe<T>,
	greater_than: c => (c as Record<'greater_than', any>).greater_than,
	in_range: c => (c as Record<'in_range', any>).in_range[0],
	less_than: c => (c as Record<'less_than', any>).less_than,
};

const STR_OPERATOR_CHANGE_HANDLERS: OperatorChangeHandlers<MatchStr, MatchStrOperator> = {
	and: (h, c) => h({ and: [c] }),
	[ANY]: h => h('any'),
	contains: (h, c, o) => h({ contains: STR_OPERATOR_TO_OPERAND[o]?.(c) ?? '' }),
	[EQUAL_TO]: (h, c, o) => h(STR_OPERATOR_TO_OPERAND[o]?.(c) ?? ''),
	not: (h, c) => h({ not: c }),
	or: (h, c) => h({ or: [c] }),
	regex: (h, c, o) => h({ regex: STR_OPERATOR_TO_OPERAND[o]?.(c) ?? '' }),
};

/** Maps a condition's {@link MatchOperator | operator} to an instruction which will extract the operand. */
export const STR_OPERATOR_TO_OPERAND: Dict<MatchStrOperator, (condition: MatchStr) => string> = {
	contains: c => (c as Record<'contains', string>).contains,
	[EQUAL_TO]: c => c as string,
	regex: c => (c as Record<'regex', string>).regex,
};

/** A map of values from the valid strings which are accepted by `<option>.value` to valid {@link MatchOperator}. */
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

/** The `<options>` for {@link SelectMatchOperator}. */
const STR_OPTIONS: readonly React.ReactElement[] = [
	<option key={0} value='and'>And</option>,
	<option key={1} value={ANY.description}>Any</option>,
	<option key={2} value={EQUAL_TO.description}>Equal to</option>,
	<option key={3} value='greater_than'>Greater than</option>,
	<option key={4} value='in_range'>In Range</option>,
	<option key={5} value='less_than'>Less than</option>,
	<option key={6} value='not'>Not</option>,
	<option key={7} value='or'>Or</option>,
];

/**
 * In an `<option>.value`, a {@link Symbol} may be represented by its `description`. This mapping returns said
 * description back to its original form.
 */
const SYMBOL_DESC_MAP: Dict<string, typeof ANY | typeof EQUAL_TO> = {
	[ANY.description!]: ANY,
	[EQUAL_TO.description!]: EQUAL_TO,
}

/** A selector for the current 'variant' (e.g. 'and', 'any') of the {@link Match} condition. */
function SelectOperator<M, O extends string | symbol>(props:
	& Omit<SelectProps<O>, 'onChange' | 'title' | 'value'>
	& Required<Children & On<'change', [M]>>
	& {
		condition: M,
		operatorChangeHandlers: OperatorChangeHandlers<M, O>,
		value: O,
	}
): React.ReactElement {
	return (
		<Select
			id={`${props.id}--operator`}
			label='Operator'
			onChange={value => props.operatorChangeHandlers[(SYMBOL_DESC_MAP[value] ?? value) as O](
				props.onChange,
				props.condition,
				props.value,
			)}
			title='The type of condition which is applied to the Operand'
			value={typeof props.value === 'symbol' ? props.value.description! : props.value}
		>
			{props.children}
		</Select>
	);
}

/** Properties of aggregates of {@link SelectOperator}. */
type Props<M, O> =
	& Omit<SelectProps<O>, 'onChange' | 'title' | 'value'>
	& Required<On<'change', [M]>>
	& { condition: M, value: O }
	;

/** A selector for the current 'variant' (e.g. 'and', 'any') of the {@link Match} condition. */
export function SelectMatchOperator<T>(props: Props<MayMatch<T>, MatchOperator>): React.ReactElement {
	return (
		<SelectOperator {...props} operatorChangeHandlers={OPERATOR_CHANGE_HANDLERS}>
			{OPTIONS}
		</SelectOperator>
	);
}

/** A selector for the current 'operator' (e.g. 'and', 'any') of the {@link MatchStr} condition. */
export function SelectMatchStrOperator(props: Props<MatchStr, MatchStrOperator>): React.ReactElement {
	return (
		<SelectOperator {...props} operatorChangeHandlers={STR_OPERATOR_CHANGE_HANDLERS}>
			{STR_OPTIONS}
		</SelectOperator>
	);
}
