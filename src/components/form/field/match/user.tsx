import React from 'react';
import type { InputMatchObjectProps } from './props';
import type { MatchUser } from '@/match';
import { InputMatchOptionEmployee } from './employee';
import { InputMatchId } from './id';
import { InputMatchDate } from './date';
import { InputMatchRole } from './role';
import { BorderLabeledField } from '../border-labeled';
import { InputMatchStr } from '../match';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchUser} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchUser(props: InputMatchObjectProps<MatchUser>): React.ReactElement {
	const VALUE = props.value ?? {};
	return <>
		<InputMatchOptionEmployee
			id={`${props.id}--employee`}
			label='Employee'
			onChange={employee => props.onChange({ ...VALUE, employee })}
			value={VALUE.employee ?? 'any'}
		/>

		<InputMatchId
			id={`${props.id}--id`}
			onChange={id => props.onChange({ ...VALUE, id })}
			value={VALUE.id ?? 'any'}
		/>

		<InputMatchDate
			id={`${props.id}--password-set`}
			label='Password Set'
			onChange={password_set => props.onChange({ ...VALUE, password_set })}
			value={VALUE.password_set ?? 'any'}
		/>

		<BorderLabeledField label='Role'>
			<InputMatchRole
				id={`${props.id}--role`}
				onChange={role => props.onChange({ ...VALUE, role })}
				value={VALUE.role}
			/>
		</BorderLabeledField>

		<InputMatchStr
			id={`${props.id}--username`}
			label='Username'
			onChange={username => props.onChange({ ...VALUE, username })}
			value={VALUE.username ?? 'any'}
		/>
	</>;
}
