'use client';

import React from 'react';
import type { BaseProps } from './props';
import { isTimesheet, type Timesheet } from '@/schema';
import {
	Form,
	FormButton,
	InputDate,
	InputId,
	Textarea,
	useEmployeeIdEventHandlers,
	useIdInputs,
	useJobIdEventHandlers,
} from '../form';
import { chainRevivers, dateReviver, optional } from '@/utils';
import { Route } from '@/api';
import { SPACE } from '../css';
import { useApiContext } from '../api';

export * from './timesheet/hooks';

/** A reviver for {@link JSON.parse} on a {@link Timesheet}. */
const REVIVER = chainRevivers([
	dateReviver<Timesheet>('time_begin'),
	optional(dateReviver<Timesheet>('time_end')),
]);

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Timesheet} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function TimesheetForm(props: BaseProps<Timesheet>): React.ReactElement {
	const [EMPLOYEE, setEmployee] = React.useState(props.initialValues?.employee /* TODO: `?? CLIENT.employee` */);
	const [EXPENSES, setExpenses] = React.useState(props.initialValues?.expenses ?? []);
	const [JOB, setJob] = React.useState(props.initialValues?.job);
	const [TIME_BEGIN, setTimeBegin] = React.useState(props.initialValues?.time_begin ?? new Date());
	const [TIME_END, setTimeEnd] = React.useState(props.initialValues?.time_end);
	const [WORK_NOTES, setWorkNotes] = React.useState(props.initialValues?.work_notes ?? '');

	const [CLIENT, showMessage] = useApiContext();
	const [EMPLOYEE_HANDLER, setEmployeeIdHandler] = useEmployeeIdEventHandlers(props.id, setEmployee);
	const [JOB_HANDLER, setJobIdHandler] = useJobIdEventHandlers(props.id, setJob);
	const [EXPENSES_HANDLER, INPUT_EXPENSES] = useIdInputs({
		id: `${props.id}--expense`,
		label: 'Expenses',
		onChange: setExpenses,
		useIdEventHandlers: useExpenseIdEventHandlers,
		values: EXPENSES,
	});

	return <>
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.post(
					showMessage,
					Route.Timesheet,
					{
						args: [
							EMPLOYEE,
							EXPENSES.map(x => [x.category, x.cost, x.description]),
							JOB,
							TIME_BEGIN,
							TIME_END,
							WORK_NOTES,
						],
					},
					isTimesheet,
					REVIVER,
				);

				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result: Timesheet = {
					...props.initialValues,
					employee: EMPLOYEE!,
					expenses: EXPENSES,
					job: JOB!,
					time_begin: TIME_BEGIN,
					time_end: TIME_END,
					work_notes: WORK_NOTES,
				};
			}

			await Promise.resolve(props.onSubmit?.(result));
			setExpenses([]);
			setTimeBegin(new Date());
			setTimeEnd(undefined);
			setWorkNotes('');
		}}>
			<InputId
				id={`${props.id}--employee`}
				label='Client'
				onAction={setEmployeeIdHandler}
				required={true}
				title='The client organization which this timesheet for'
				value={EMPLOYEE?.id ?? ''}
			/>

			<InputDate
				id={`${props.id}--date--open`}
				label='Time Begin'
				onChange={setTimeBegin}
				required={true}
				title='The date that this timesheet was opened'
				value={TIME_BEGIN}
			/>

			<InputDate
				id={`${props.id}--date--close`}
				label='Time End'
				onChange={setTimeEnd}
				title='The date that this timesheet was opened'
				value={TIME_END}
			/>

			{INPUT_EXPENSES}

			<InputId
				id={`${props.id}--job`}
				label='Client'
				onAction={setJobIdHandler}
				required={true}
				title='The client organization which this timesheet for'
				value={JOB?.id ?? ''}
			/>

			<Textarea
				id={`${props.id}--work-notes`}
				label='Objectives'
				onChange={setWorkNotes}
				required={true}
				title='What things must be accomplished before the timesheet can be considered "complete"'
				value={WORK_NOTES}
			/>

			<FormButton className={SPACE} />
		</Form>

		{EMPLOYEE_HANDLER}
		{EXPENSES_HANDLER}
		{JOB_HANDLER}
	</>;
}
