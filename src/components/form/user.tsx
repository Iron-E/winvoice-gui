'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Form, FormButton, InputId, InputString, useEmployeeIdEventHandlers, useRoleIdEventHandlers } from '../form';
import { InputPassword } from './field/password';
import { isUser, type User } from '@/schema';
import { Route } from '@/api';
import { SPACE } from '../css';
import { useApiContext } from '../api';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link User} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function UserForm(props: BaseProps<User>): React.ReactElement {
	const [EMPLOYEE, setEmployee] = React.useState(props.initialValues?.employee);
	const [PASSWORD, setPassword] = React.useState(props.initialValues?.password ?? '');
	const [ROLE, setRole] = React.useState(props.initialValues?.role);
	const [USERNAME, setUsername] = React.useState(props.initialValues?.username ?? '');

	const [CLIENT, showMessage] = useApiContext();
	const [EMPLOYEE_HANDLER, setEmployeeIdEvent] = useEmployeeIdEventHandlers(props.id, setEmployee);
	const [ROLE_HANDLER, setRoleIdEvent] = useRoleIdEventHandlers(props.id, setRole);

	return <>
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.post(showMessage, Route.User, { args: [EMPLOYEE, PASSWORD, ROLE] }, isUser);
				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result: User = { ...props.initialValues, employee: EMPLOYEE, password: PASSWORD, role: ROLE! };
			}

			await Promise.resolve(props.onSubmit?.(result));
			setUsername('');
		}}>
			<InputId
				id={`${props.id}--employee`}
				label='Employee'
				onAction={setEmployeeIdEvent}
				title='The employee associated with this user'
				value={EMPLOYEE?.id ?? ''}
			/>

			<InputPassword
				id={`${props.id}--password`}
				onChange={setPassword}
				required={true}
				title='The name of this user; must be unique among other users'
				value={USERNAME}
			/>

			<InputId
				id={`${props.id}--role`}
				label='Role'
				onAction={setRoleIdEvent}
				required={true}
				title='The employee associated with this user'
				value={ROLE?.id ?? ''}
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

			<FormButton className={SPACE} />
		</Form>

		{EMPLOYEE_HANDLER}
		{ROLE_HANDLER}
	</>;
}
