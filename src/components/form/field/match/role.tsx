import React from 'react';
import type { InputMatchObjectProps } from './props';
import type { MatchRole } from '@/match';
import { InputMatchId } from './id';
import { InputMatchStr } from '../match';
import { InputMatchDuration } from './duration';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchRole} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchRole(props: InputMatchObjectProps<MatchRole>): React.ReactElement {
	const VALUE = props.value ?? {};
	return <>
		<InputMatchId
			id={`${props.id}--id`}
			onChange={id => props.onChange({ ...VALUE, id })}
			value={VALUE.id ?? 'any'}
		/>

		<InputMatchStr
			id={`${props.id}--name`}
			label='Name'
			onChange={name => props.onChange({ ...VALUE, name })}
			value={VALUE.name ?? 'any'}
		/>

		<InputMatchDuration
			id={`${props.id}--password-ttl`}
			label='Password TTL'
			onChange={password_ttl => props.onChange({ ...VALUE, password_ttl })}
			value={VALUE.password_ttl ?? 'any'}
		/>
	</>;
}
