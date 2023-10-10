import { On } from "@/components/props-with";
import { Select } from "../../field";
import type { SelectProps } from "../props";
import { Fn, Maybe } from "@/utils";
import { Match } from "@/match";

/** The operators of a {@link Match} condition. */
export type MatchOperators =
	| 'and'
	| typeof ANY
	| typeof EQUAL_TO
	| 'or'
	| `${'greater' | 'less'}_than`
	| 'in_range'
	| 'not'
	;

/** {@link Match}es {@link Maybe<T>}. */
export type MayMatch<T> = Match<Maybe<T>>;

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

/** A lookup table for handlers used in {@link handleOperatorChange}. */
const HANDLE_OPERATOR_CHANGE: Readonly<Record<
	MatchOperators,
	<T>(handler: Fn<[value: MayMatch<T>]>, condition: MayMatch<T>, operator: MatchOperators) => void
>> = {
	and: (h, c) => h({ and: [c] }),
	[ANY]: h => h('any'),
	[EQUAL_TO]: (h, c, o) => h(OPERATOR_TO_OPERAND[o]?.(c)),
	greater_than: (h, c, o) => h({ greater_than: OPERATOR_TO_OPERAND[o]?.(c) }),
	in_range: (h, c, o) => h({ in_range: [OPERATOR_TO_OPERAND[o]?.(c), undefined] }),
	less_than: (h, c, o) => h({ less_than: OPERATOR_TO_OPERAND[o]?.(c) }),
	not: (h, c) => h({ not: c }),
	or: (h, c) => h({ or: [c] }),
};

/** Maps a condition's {@link MatchOperator | operator} to an instruction which will extract the operand. */
export const OPERATOR_TO_OPERAND: Readonly<Partial<Record<MatchOperators, <T>(condition: MayMatch<T>) => Maybe<T>>>> = {
	[EQUAL_TO]: <T,>(c: MayMatch<T>) => c as Maybe<T>,
	greater_than: c => (c as Record<'greater_than', any>).greater_than,
	in_range: c => (c as Record<'in_range', any>).in_range[0],
	less_than: c => (c as Record<'less_than', any>).less_than,
};

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

/** Props for the {@link SelectMatchOperator} component. */
type Props = SelectProps<MatchOperators>;

/** A selector for the current 'variant' (e.g. 'and', 'any') of the {@link Match} condition. */
export function SelectMatchOperator<T>(props:
	& Omit<Props, 'onChange' | 'title' | 'value'>
	& Required<On<'change', [MayMatch<T>]>>
	& { condition: MayMatch<T>, value: MatchOperators }
): React.ReactElement {
	return (
		<Select
			id={`${props.id}--operator`}
			label='Operator'
			onChange={value => HANDLE_OPERATOR_CHANGE[OPTIONS_VALUE_MAP[value] ?? value as MatchOperators](
				props.onChange,
				props.condition,
				props.value,
			)}
			title='The type of condition which is applied to the Operand'
			value={typeof props.value === 'symbol' ? props.value.description! : props.value}
		>
			{OPTIONS}
		</Select>
	);
}
