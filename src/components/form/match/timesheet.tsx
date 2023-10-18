'use client';

import React from 'react';
import type { MatchTimesheet } from '@/match'
import type { SearchProps } from './props';
import { InputMatchTimesheet } from '../field';
import { Route } from '@/api';
import { type Timesheet, isTimesheet } from '@/schema';
import { useMatchForm } from './hooks';
import { useTimesheetTable } from '@/components/table';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchTimesheet} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchTimesheetForm(props: SearchProps<Timesheet>): React.ReactElement {
	return useMatchForm(
		props.id,
		InputMatchTimesheet,
		useTimesheetTable(props.onRowSelect),
		Route.Timesheet,
		isTimesheet,
	);
}
