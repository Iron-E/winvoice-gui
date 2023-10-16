'use client';

import React from 'react';
import type { MatchEmployee } from '@/match'
import type { SearchProps } from './props';
import { Form, FormButton } from '../../form';
import { InputMatchEmployee } from '../field';
import { Route } from '@/api';
import { SPACE } from '@/components/css';
import { type Employee, isEmployee } from '@/schema';
import { useApiContext } from '../../api';
import { useEmployeeTable } from '@/components/table';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchEmployee} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchEmployeeForm(props: SearchProps<Employee>): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [MATCH, setMatch] = React.useState<MatchEmployee>({});
	const [ORDERED_DATA, TABLE] = useEmployeeTable();
	return <>
		<Form
			onSubmit={async () => {
				const RESULT = await CLIENT.retrieve(showMessage, Route.Employee, { condition: MATCH }, isEmployee);
				if (RESULT === null) { return; } else if (RESULT.length < 1) {
					showMessage('info', 'Search returned no results');
				}

				ORDERED_DATA.setData?.(RESULT);
			}}
		>
			<InputMatchEmployee
				id={`${props.id}--employee`}
				onChange={setMatch}
				value={MATCH}
			/>

			<FormButton className={SPACE} />
		</Form>
		{TABLE}
	</>;
}
