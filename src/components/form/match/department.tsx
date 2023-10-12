'use client';

import React from 'react';
import type { MatchDepartment } from '@/match'
import type { SearchProps } from './props';
import { Form, FormButton } from '../../form';
import { InputMatchDepartment } from '../field';
import { Route } from '@/api';
import { type Department, isDepartment } from '@/schema';
import { useApiContext } from '../../api';
import { SPACE } from '@/components/css';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchDepartment} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchDepartmentForm(props: SearchProps<Department>): React.ReactElement {
	const [MATCH, setMatch] = React.useState<MatchDepartment>({});
	return <>
		<Form
			onSubmit={async () => {
			}}
		>
			<InputMatchDepartment
				id={`${props.id}--department`}
				label=''
				onChange={setMatch}
				value={MATCH}
			/>

			<FormButton className={SPACE} />
		</Form>
	</>;
}
