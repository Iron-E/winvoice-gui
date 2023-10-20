'use client';

import React from 'react';
import type { MatchExpense } from '@/match'
import type { SearchProps } from './props';
import { InputMatchExpense } from '../field';
import { isExpense, type Expense } from '@/schema';
import { Route } from '@/api';
import { useExpenseTable } from '@/components/table';
import { useMatchForm } from './hooks';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchExpense} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function MatchExpenseForm(props: SearchProps<Expense>): React.ReactElement {
	return useMatchForm(props.id, InputMatchExpense, useExpenseTable(props.onRowSelect), Route.Expense, isExpense);
}
