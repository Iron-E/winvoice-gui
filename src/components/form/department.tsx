'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Form, FormButton, InputString } from '../form';
import { Route } from '@/api';
import { SPACE } from '../css';
import { isDepartment, type Department } from '@/schema';
import { useApiContext } from '../api';

export * from './department/hooks';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Department} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function DepartmentForm(props: BaseProps<Department>): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [NAME, setName] = React.useState(props.initialValues?.name ?? '');

	return (
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.post(showMessage, Route.Department, { args: NAME }, isDepartment);
				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result = { ...props.initialValues, name: NAME };
			}

			await Promise.resolve(props.onSubmit?.(result));
			setName('');
		}}>
			<InputString
				id={`${props.id}--name`}
				onChange={setName}
				placeholder='Accounting'
				required={true}
				title='The name of the department which is to be created'
				value={NAME}
			/>

			<FormButton className={SPACE} />
		</Form>
	 );
}
