import type { Fn } from "@/utils";
import type { Match, MatchStr } from "@/match";
import type { On } from "@/components/props-with";
import type { SelectProps } from "../props";
import { ANY, EQUAL_TO } from './operator';
import { Select } from "../../field";

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

/** A lookup table for handlers used in {@link handleOperatorChange}. */
const HANDLE_OPERATOR_CHANGE: Readonly<Record<
	MatchStrOperator,
	(handler: Fn<[value: MatchStr]>, condition: MatchStr, operator: MatchStrOperator) => void
>> = {
	and: (h, c) => h({ and: [c] }),
	[ANY]: h => h('any'),
	contains: (h, c, o) => h({ contains: STR_OPERATOR_TO_OPERAND[o]?.(c) ?? '' }),
	[EQUAL_TO]: (h, c, o) => h(STR_OPERATOR_TO_OPERAND[o]?.(c) ?? ''),
	not: (h, c) => h({ not: c }),
	or: (h, c) => h({ or: [c] }),
	regex: (h, c, o) => h({ regex: STR_OPERATOR_TO_OPERAND[o]?.(c) ?? '' }),
};

/** Maps a condition's {@link MatchOperator | operator} to an instruction which will extract the operand. */
export const STR_OPERATOR_TO_OPERAND: Readonly<Partial<Record<MatchStrOperator, (condition: MatchStr) => string>>> = {
	contains: c => (c as Record<'contains', string>).contains,
	[EQUAL_TO]: c => c as string,
	regex: c => (c as Record<'regex', string>).regex,
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

/** A map of values from the valid strings which are accepted by `<option>.value` to valid {@link MatchStrOperator}. */
const OPTIONS_VALUE_MAP: Partial<Record<string, MatchStrOperator>> = {
	[ANY.description!]: ANY,
	[EQUAL_TO.description!]: EQUAL_TO,
}

/** Props for the {@link SelectMatchOperator} component. */
type Props = SelectProps<MatchStrOperator>;

/** A selector for the current 'variant' (e.g. 'and', 'any') of the {@link Match} condition. */
export function SelectMatchStrOperator(props:
	& Omit<Props, 'onChange' | 'title' | 'value'>
	& Required<On<'change', [MatchStr]>>
	& { condition: MatchStr, value: MatchStrOperator }
): React.ReactElement {
	return (
		<Select
			id={`${props.id}--operator`}
			label='Operator'
			onChange={value => HANDLE_OPERATOR_CHANGE[OPTIONS_VALUE_MAP[value] ?? value as MatchStrOperator](
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
