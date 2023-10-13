'use client';

import React from 'react';
import { ExpenseForm, useExpenseTable } from '@/components';

export default function Page(): React.ReactElement {
	const [ORDERED_DATA, TABLE] = useExpenseTable();
	return <>
		{/* WARN: passing function (i.e. not using closure) changes 'this' context */}
		<ExpenseForm id='new-expense-form' onSubmit={x => ORDERED_DATA.append(x)} />
		{TABLE}
	</>;
}
