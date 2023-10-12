'use client';

import type { CompositeProps } from '../props';
import type { Id } from '@/schema';
import { InputMatch, type InputMatchField } from '../match';
import { Input } from '../../field';
import { Match } from '@/match';

const InputId: InputMatchField<Id> = props => (
	<Input
		{...props}
		inputClassName='min-w-[36ch]'
		label={props.label ?? 'Id'}
		placeholder='8f6742f9-73ed-42f9-9631-603509fba707'
		value={props.value ?? ''}
	/>
);

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchId} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchId(props: Required<CompositeProps<Match<Id>>>): React.ReactElement {
	return (
		<InputMatch
			id={props.id}
			inputField={InputId}
			label={props.label}
			onChange={value => props.onChange(value ?? '')}
			value={props.value}
		/>
	);
}
