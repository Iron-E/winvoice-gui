'use client';

import React from 'react';
import type { BaseProps } from './props';
import { isExpense, type Expense } from '@/schema';
import {
	Form,
	FormButton,
	InputId,
	InputMoney,
	InputString,
	Textarea,
	useTimesheetIdEventHandlers,
} from '../form';
import { Route } from '@/api';
import { SPACE } from '../css';
import { useApiContext } from '../api';

export * from './expense/hooks';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Expense} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function ExpenseForm(props: BaseProps<Expense>): React.ReactElement {
	const [CATEGORY, setCategory] = React.useState(props.initialValues?.category ?? '');
	const [COST, setCost] = React.useState(props.initialValues?.cost);
	const [DESCRIPTION, setDescription] = React.useState(props.initialValues?.description ?? '');
	const [TIMESHEET_ID, setTimesheetId] = React.useState(props.initialValues?.timesheet_id);

	const [CLIENT, showMessage] = useApiContext();
	const [TIMESHEET_HANDLER, setTimesheetIdHandler] = useTimesheetIdEventHandlers(props.id, t => setTimesheetId(t.id));

	return <>
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.post(
					showMessage,
					Route.Expense,
					{
						args: [
							[[CATEGORY, COST, DESCRIPTION]],
							TIMESHEET_ID,
						],
					},
					isExpense,
				);

				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result: Expense = {
					...props.initialValues,
					category: CATEGORY,
					cost: COST!,
					description: DESCRIPTION,
					timesheet_id: TIMESHEET_ID!,
				};
			}

			await Promise.resolve(props.onSubmit?.(result));
			setDescription('');
		}}>
			<InputString
				id={`${props.id}--category`}
				label='Client'
				onChange={setCategory}
				required={true}
				title='The broad type of expense which this is'
				value={CATEGORY}
			/>

			<InputMoney
				id={`${props.id}--date--close`}
				label='Cost'
				onChange={setCost}
				value={COST}
			/>

			<Textarea
				id={`${props.id}--description`}
				label='Objectives'
				onChange={setDescription}
				required={true}
				title='A description of the expense'
				value={DESCRIPTION}
			/>

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
