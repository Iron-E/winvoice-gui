import { On } from "@/components/props-with";
import { Select } from "../../field";
import type { SelectProps } from "../props";
import { ValueOf } from "@/utils";

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
export function SelectMatchOperator(props:
	& Omit<Props, 'onChange' | 'title' | 'value'>
	& Required<On<
		'change',
		[...Parameters<ValueOf<Props, 'onChange'>>, newValue: MatchOperators],
		ReturnType<ValueOf<Props, 'onChange'>>
	>>
	& { value: MatchOperators }
): React.ReactElement {
	return (
		<Select
			id={`${props.id}--operator`}
			label='Operator'
			onChange={value => props.onChange?.(props.value, OPTIONS_VALUE_MAP[value] ?? value as MatchOperators)}
			title='The type of condition which is applied to the Operand'
			value={typeof props.value === 'symbol' ? props.value.description! : props.value}
		>
			{OPTIONS}
		</Select>
	);
}
