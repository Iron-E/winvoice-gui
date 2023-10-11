'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Form } from '../form';
import { FormButton } from './button';
import { InputDuration, InputString } from './field';
import { isRole, type Role } from '@/schema';
import { Route } from '@/api';
import { SPACE } from '../css';
import { useApiContext } from '../api';

export * from './role/hooks';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Role} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function RoleForm(props: BaseProps<Role>): React.ReactElement {
	const [NAME, setName] = React.useState(props.initialValues?.name ?? '');
	const [PASSWORD_TTL, setPasswordTtl] = React.useState(props.initialValues?.password_ttl ?? '');

	const [CLIENT, showMessage] = useApiContext();

	return (
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.post(showMessage, Route.Role, { args: [NAME, PASSWORD_TTL] }, isRole);
				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result: Role = { ...props.initialValues, name: NAME, password_ttl: PASSWORD_TTL };
			}

			await Promise.resolve(props.onSubmit?.(result));
			setName('');
		}}>
			<InputString
				id={`${props.id}--name`}
				onChange={setName}
				placeholder='Admin'
				required={true}
				title='The name of the role which is to be created'
				value={NAME}
			/>

			<InputDuration
				id={`${props.id}--password-ttl`}
				label='Password TTL'
				onChange={setPasswordTtl}
				title="The duration for which a user with this role's password will be valid before requiring rotation"
				value={PASSWORD_TTL}
			/>

			<FormButton className={SPACE} />
		</Form>
	);
}
