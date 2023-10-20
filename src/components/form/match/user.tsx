'use client';

import React from 'react';
import type { MatchUser } from '@/match'
import type { SearchProps } from './props';
import { InputMatchUser } from '../field';
import { isUser, type User, USER_REVIVER } from '@/schema';
import { Route } from '@/api';
import { useMatchForm } from './hooks';
import { useUserTable } from '@/components/table';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchUser} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchUserForm(props: SearchProps<User>): React.ReactElement {
	return useMatchForm(props.id, InputMatchUser, useUserTable(props.onRowSelect), Route.User, isUser, USER_REVIVER);
}
