'use client';

import React from 'react';
import type { MatchOrganization } from '@/match'
import type { SearchProps } from './props';
import { InputMatchOrganization } from '../field';
import { isOrganization, type Organization } from '@/schema';
import { Route } from '@/api';
import { useMatchForm } from './hooks';
import { useOrganizationTable } from '@/components/table';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchOrganization} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchOrganizationForm(props: SearchProps<Organization>): React.ReactElement {
	return useMatchForm(
		props.id,
		InputMatchOrganization,
		useOrganizationTable(props.onRowSelect),
		Route.Organization,
		isOrganization,
	);
}
