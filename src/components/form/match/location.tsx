'use client';

import React from 'react';
import type { MatchLocation } from '@/match'
import type { SearchProps } from './props';
import { InputMatchLocation } from '../field';
import { Route } from '@/api';
import { type Location, isLocation } from '@/schema';
import { useLocationTable } from '@/components/table';
import { useMatchForm } from './hooks';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchLocation} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchLocationForm(props: SearchProps<Location>): React.ReactElement {
	return useMatchForm(
		props.id,
		InputMatchLocation,
		...useLocationTable(props.onRowSelect),
		Route.Location,
		isLocation,
	);
}
