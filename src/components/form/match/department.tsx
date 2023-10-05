'use client';

import React from 'react';
import type { MatchDepartment } from '@/match'
import type { SearchProps } from './props';
import { Form, FormButton } from '../../form';
import { type Department, isDepartment } from '@/schema';
import { Route } from '@/api';
import { SPACE } from '../../css';
import { useApiContext } from '../../api';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchDepartment} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchDepartmentForm(props: SearchProps<Department>): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [CONDITION, setCondition] = React.useState<MatchDepartment>({});

	return (
		<Form onSubmit={async () => {
			const RESULT = await CLIENT.get(showMessage, Route.Department, { condition: CONDITION }, isDepartment);
			if (RESULT === null) { return; }

			await Promise.resolve(props.onSubmit?.(RESULT));
			setCondition({});
		}}>
			{/* TODO: id: InputMatchId */}
			{/* TODO: name: InputMatchStr */}

			<FormButton className={SPACE} />
		</Form>
	);
}
