'use client';

import React from 'react';
import type { MatchRole } from '@/match'
import type { SearchProps } from './props';
import { InputMatchRole } from '../field';
import { Route } from '@/api';
import { type Role, isRole } from '@/schema';
import { useMatchForm } from './hooks';
import { useRoleTable } from '@/components/table';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchRole} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchRoleForm(props: SearchProps<Role>): React.ReactElement {
	return useMatchForm(props.id, InputMatchRole, useRoleTable(props.onRowSelect), Route.Role, isRole);
}
