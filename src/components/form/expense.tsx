'use client';

import React from 'react';
import type { BaseProps } from './props';
import type { Maybe } from '@/utils';
import { Form, FormButton, InputId, useTimesheetIdEventHandlers } from '../form';
import { InputExpense } from './field/expense';
import { isExpense, type Expense, type ExpenseValue } from '@/schema';
import { Route } from '@/api';
import { SPACE } from '../css';
import { useApiContext } from '../api';

export * from './expense/hooks';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Expense} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function ExpenseForm(props: BaseProps<Expense>): React.ReactElement {
	const [TIMESHEET_ID, setTimesheetId] = React.useState(props.initialValues?.timesheet_id);
	const [VALUES, setValues] = React.useState<Maybe<ExpenseValue>>(props.initialValues && [
		props.initialValues.category,
		props.initialValues.cost,
		props.initialValues.description,
	]);

	const [CLIENT, showMessage] = useApiContext();
	const [TIMESHEET_HANDLER, setTimesheetIdHandler] = useTimesheetIdEventHandlers(props.id, t => setTimesheetId(t.id));

	return <>
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.post(
					showMessage,
					Route.Expense,
					{
						args: [[VALUES], TIMESHEET_ID],
					},
					isExpense,
				);

				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result: Expense = {
					...props.initialValues,
					category: VALUES![0],
					cost: VALUES![1],
					description: VALUES![2],
					timesheet_id: TIMESHEET_ID!,
				};
			}

			await Promise.resolve(props.onSubmit?.(result));
			setValues([VALUES![0], VALUES![1], '']);
		}}>
			<InputExpense id={props.id} onChange={setValues} value={VALUES} />

			<InputId
				id={`${props.id}--timesheet-id`}
				label='Timesheet'
				onAction={setTimesheetIdHandler}
				required={true}
				title='The timesheet this expense was incurred on'
				value={TIMESHEET_ID ?? ''}
			/>

			<FormButton className={SPACE} />
		</Form>

		{TIMESHEET_HANDLER}
	</>;
}
