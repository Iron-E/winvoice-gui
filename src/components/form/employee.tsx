'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Form, FormButton, InputId, InputString, useIdEventHandlers } from '../form';
import { Route } from '@/api';
import { SPACE } from '../css';
import { isEmployee, type Employee } from '@/schema';
import { useApiContext } from '../api';

/** Event handlers for a {@link Employee} ID. */
export function useEmployeeIdEventHandlers(
	id: string,
	setEmployee: Parameters<typeof useIdEventHandlers<Employee>>[0],
): ReturnType<typeof useIdEventHandlers<Employee>> {
	return useIdEventHandlers(setEmployee, p => <EmployeeForm {...p} id={`${id}--employee--form`} />);
}

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Employee} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function EmployeeForm(props: BaseProps<Employee>): React.ReactElement {
	const [DEPARTMENT, setDepartment] = React.useState(props.initialValues?.department);
	const [NAME, setName] = React.useState(props.initialValues?.name ?? '');
	const [TITLE, setTitle] = React.useState(props.initialValues?.title ?? '');

	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setIdEvent] = useEmployeeIdEventHandlers(props.id, setDepartment);

	return <>
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.post(showMessage, Route.Employee, { args: [DEPARTMENT, NAME, TITLE] }, isEmployee);
				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result = { ...props.initialValues, department: DEPARTMENT!, name: NAME, title: TITLE };
			}

			await Promise.resolve(props.onSubmit?.(result));
			setDepartment(undefined);
			setName('');
			setTitle('');
		}}>
			<InputId
				id={`${props.id}--outer`}
				label='Department'
				onNew={setIdEvent}
				onSearch={setIdEvent}
				title='The department the employee is assigned to'
				value={DEPARTMENT?.id ?? ''}
			/>

			<InputString
				id={`${props.id}--name`}
				onChange={setName}
				required={true}
				title='The name of the employee'
				value={NAME}
			/>

			<InputString
				id={`${props.id}--title`}
				label='Title'
				onChange={setTitle}
				required={true}
				title='The title of the employee'
				value={TITLE}
			/>

			<FormButton className={SPACE} />
		</Form>

		{HANDLER}
	</>;
}
