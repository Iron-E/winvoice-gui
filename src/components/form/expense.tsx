'use client';

import React from 'react';
import type { BaseProps } from './props';
import type { Maybe, Reviver } from '@/utils';
import { Form } from '../form';
import { FormButton } from './button';
import { InputExpense } from './field/expense';
import { InputId } from './field';
import { isExpense, type Expense, type ExpenseValue } from '@/schema';
import { Route, response } from '@/api';
import { SPACE } from '../css';
import { useApiContext } from '../api';
import { useTimesheetIdEventHandlers } from './timesheet';

export * from './expense/hooks';

const REVIVER: Reviver = (k, v: response.Put<Expense[]>) => (
	k === '' && v.entity instanceof Array
	? { ...v, entity: v.entity[0] }
	: v
);

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Expense} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function ExpenseForm(props: BaseProps<Expense>): React.ReactElement {
	const [TIMESHEET_ID, setTimesheetId] = React.useState(props.initialValues?.timesheet_id);
	const [VALUES, setValues] = React.useState<Maybe<ExpenseValue>>(props.initialValues && [
		props.initialValues?.category,
		props.initialValues?.cost,
		props.initialValues?.description,
	]);

	const [CLIENT, showMessage] = useApiContext();
	const [TIMESHEET_HANDLER, setTimesheetIdHandler] = useTimesheetIdEventHandlers(props.id, t => setTimesheetId(t.id));

	return <>
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.create(
					showMessage,
					Route.Expense,
					{ args: [[VALUES], TIMESHEET_ID] },
					isExpense,
					REVIVER,
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
			setValues([result.category, result.cost, '']);
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
