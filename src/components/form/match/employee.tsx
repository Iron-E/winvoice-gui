'use client';

import React from 'react';
import type { MatchEmployee } from '@/match'
import type { SearchProps } from './props';
import { InputMatchEmployee } from '../field';
import { Route } from '@/api';
import { type Employee, isEmployee } from '@/schema';
import { useEmployeeTable } from '@/components/table';
import { useMatchForm } from './hooks';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchEmployee} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchEmployeeForm(props: SearchProps<Employee>): React.ReactElement {
	return useMatchForm(
		props.id,
		InputMatchEmployee,
		useEmployeeTable(props.onRowSelect),
		Route.Employee,
		isEmployee,
	);
}
