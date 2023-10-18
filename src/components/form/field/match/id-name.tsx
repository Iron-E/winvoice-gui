import React from 'react';
import type { Id } from '@/schema';
import type { InputMatchObjectProps } from './props';
import type { Match, MatchOrganization, MatchStr } from '@/match';
import { InputMatchId } from './id';
import { InputMatchStr } from '../match';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchOrganization} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchIdAndName<M extends { id?: Match<Id>, name?: MatchStr }>(
	props: InputMatchObjectProps<M>,
): React.ReactElement {
	const VALUE = props.value ?? {} as M;
	return <>
		<InputMatchId
			id={`${props.id}--id`}
			label='Id'
			onChange={id => props.onChange({ ...VALUE, id })}
			value={VALUE.id ?? 'any'}
		/>

		<InputMatchStr
			id={`${props.id}--name`}
			label='Name'
			onChange={name => props.onChange({ ...VALUE, name })}
			value={VALUE.name ?? 'any'}
		/>
	</>;
}
