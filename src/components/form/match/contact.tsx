'use client';

import React from 'react';
import type { MatchContact } from '@/match'
import type { SearchProps } from './props';
import { InputMatchContact } from '../field';
import { Route } from '@/api';
import { type Contact, isContact } from '@/schema';
import { useContactTable } from '@/components/table';
import { useMatchForm } from './hooks';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchContact} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchContactForm(props: SearchProps<Contact>): React.ReactElement {
	return useMatchForm(
		props.id,
		InputMatchContact,
		useContactTable(props.onRowSelect),
		Route.Contact,
		isContact,
	);
}
