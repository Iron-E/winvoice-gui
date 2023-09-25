'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Form, FormButton, InputId, InputString, useEmployeeIdEventHandlers, useRoleIdEventHandlers } from '../form';
import { InputPassword } from './field/password';
import { isUser, type User } from '@/schema';
import { Route } from '@/api';
import { SPACE } from '../css';
import { useApiContext } from '../api';
import { dateReviver } from '@/utils';

/** The {@link Reviver} for {@link User}s. */
const REVIVER = dateReviver<User>('password_set');

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link User} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function UserForm(props: BaseProps<User>): React.ReactElement {
	const [EMPLOYEE, setEmployee] = React.useState(props.initialValues?.employee);
	// NOTE: explicitly ignoring the initial value because the user's password should never be shown.
	//       the winvoice-server prevents takes measures to prevent password leaking, but it is better
	//       to act as if those measures will fail and simply not show the password not matter what.
	const [PASSWORD, setPassword] = React.useState('');
	const [ROLE, setRole] = React.useState(props.initialValues?.role);
	const [USERNAME, setUsername] = React.useState(props.initialValues?.username ?? '');

	const [CLIENT, showMessage] = useApiContext();
	const [EMPLOYEE_HANDLER, setEmployeeIdEvent] = useEmployeeIdEventHandlers(props.id, setEmployee);
	const [ROLE_HANDLER, setRoleIdEvent] = useRoleIdEventHandlers(props.id, setRole);

	return <>
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.post(showMessage, Route.User, { args: [EMPLOYEE, PASSWORD, ROLE, USERNAME] }, isUser, REVIVER);
				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result: User = { ...props.initialValues, employee: EMPLOYEE, password: PASSWORD, role: ROLE!, username: USERNAME };
			}

			await Promise.resolve(props.onSubmit?.(result));
			setUsername('');
			setPassword('');
		}}>
			<InputId
				id={`${props.id}--employee`}
				label='Employee'
				onAction={setEmployeeIdEvent}
				title='The employee associated with this user; used to track contribution to Jobs, etc.'
				value={EMPLOYEE?.id ?? ''}
			/>

			<InputString
				id={`${props.id}--username`}
				label='Username'
				onChange={setUsername}
				placeholder='john_doe_45'
				required={true}
				title='The name of this user; must be unique among other users'
				value={USERNAME}
			/>

			<InputPassword
				id={`${props.id}--password`}
				onChange={setPassword}
				placeholder={props.initialValues && 'Type here to set a new password'}
				required={props.initialValues === undefined}
				title="The user's password"
				value={PASSWORD}
			/>

			<InputId
				id={`${props.id}--role`}
				label='Role'
				onAction={setRoleIdEvent}
				required={true}
				title='The role of the user; controls the majority of their permissions'
				value={ROLE?.id ?? ''}
			/>

			<FormButton className={SPACE} />
		</Form>

		{EMPLOYEE_HANDLER}
		{ROLE_HANDLER}
	</>;
}
