'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Checkbox } from './field';
import { Form, InputId, InputString } from '../form';
import { FormButton } from './button';
import { isEmployee, type Employee } from '@/schema';
import { Route } from '@/api';
import { SPACE } from '../css';
import { useApiContext } from '../api';
import { useDepartmentIdEventHandlers } from './department';

export * from './employee/hooks';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Employee} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function EmployeeForm(props: BaseProps<Employee>): React.ReactElement {
	const [ACTIVE, setActive] = React.useState(props.initialValues?.active ?? true);
	const [DEPARTMENT, setDepartment] = React.useState(props.initialValues?.department);
	const [NAME, setName] = React.useState(props.initialValues?.name ?? '');
	const [TITLE, setTitle] = React.useState(props.initialValues?.title ?? '');

	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setIdEvent] = useDepartmentIdEventHandlers(props.id, setDepartment);

	return <>
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.create(showMessage, Route.Employee, { args: [DEPARTMENT, NAME, TITLE] }, isEmployee);
				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result = { ...props.initialValues, active: ACTIVE, department: DEPARTMENT!, name: NAME, title: TITLE };
			}

			await Promise.resolve(props.onSubmit?.(result));
			setName('');
		}}>
			{props.initialValues && (
				<Checkbox
					checked={ACTIVE}
					id={`${props.id}--active`}
					onChange={() => setActive(active => !active)}
					title='Whether the employee is active at the company'
				>
					Active
				</Checkbox>
			)}

			<InputId
				id={`${props.id}--department`}
				label='Department'
				onAction={setIdEvent}
				required={true}
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
				placeholder='Manager'
				required={true}
				title='The title of the employee'
				value={TITLE}
			/>

			<FormButton className={SPACE} />
		</Form>

		{HANDLER}
	</>;
}
