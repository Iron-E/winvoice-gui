'use client';

import React from 'react';
import type { Expense } from '@/schema';
import { ExpenseForm, ExpenseTable, expenseValuators, useOrderedData } from '@/components';

export default function Page(): React.ReactElement {
	const ORDERED_DATA = useOrderedData<Expense>('category', expenseValuators());
	return <>
		<ExpenseForm
			id='new-expense-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={x => ORDERED_DATA.append(x)}
		/>

		{ORDERED_DATA.data.length > 0 && <ExpenseTable orderedData={ORDERED_DATA} />}
	</>;
}
