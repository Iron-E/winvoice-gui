'use client';

import React from 'react';
import type { MatchDepartment } from '@/match'
import type { SearchProps } from './props';
import { Form, FormButton } from '../../form';
import { InputMatchDepartment } from '../field';
import { Route } from '@/api';
import { SPACE } from '@/components/css';
import { type Department, isDepartment } from '@/schema';
import { useApiContext } from '../../api';
import { useDepartmentTable } from '@/components/table/department';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchDepartment} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchDepartmentForm(props: SearchProps<Department>): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [MATCH, setMatch] = React.useState<MatchDepartment>({});
	const [ORDERED_DATA, TABLE] = useDepartmentTable();
	return <>
		<Form
			onSubmit={async () => {
				const RESULT = await CLIENT.retrieve(showMessage, Route.Department, { condition: MATCH }, isDepartment);
				if (RESULT === null) { return; } else if (RESULT.length < 1) {
					showMessage('info', 'Search returned no results');
				}

				ORDERED_DATA.setData?.(RESULT);
			}}
		>
			<InputMatchDepartment
				id={`${props.id}--department`}
				onChange={setMatch}
				value={MATCH}
			/>

			<FormButton className={SPACE} />
		</Form>
		{TABLE}
	</>;
}
