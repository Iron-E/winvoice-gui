'use client';

import React from 'react';
import type { MatchDepartment } from '@/match'
import type { SearchProps } from './props';
import { InputMatchDepartment } from '../field';
import { isDepartment, type Department } from '@/schema';
import { Route } from '@/api';
import { useDepartmentTable } from '@/components/table';
import { useMatchForm } from './hooks';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchDepartment} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchDepartmentForm(props: SearchProps<Department>): React.ReactElement {
	return useMatchForm(
		props.id,
		InputMatchDepartment,
		useDepartmentTable(props.onRowSelect),
		Route.Department,
		isDepartment,
	);
}
