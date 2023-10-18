'use client';

import React from 'react';
import type { MatchJob } from '@/match'
import type { SearchProps } from './props';
import { InputMatchJob } from '../field';
import { Route } from '@/api';
import { type Job, isJob } from '@/schema';
import { useJobTable } from '@/components/table';
import { useMatchForm } from './hooks';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchJob} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchJobForm(props: SearchProps<Job>): React.ReactElement {
	return useMatchForm(props.id, InputMatchJob, useJobTable(props.onRowSelect), Route.Job, isJob);
}
