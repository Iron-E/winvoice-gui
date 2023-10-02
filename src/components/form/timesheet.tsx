'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Department, isTimesheet, type Timesheet } from '@/schema';
import {
	Form,
	FormButton,
	InputDate,
	InputDuration,
	InputId,
	InputInvoice,
	Textarea,
	useDepartmentIdEventHandlers,
	useEmployeeIdEventHandlers,
	useIdInputs,
	useOrganizationIdEventHandlers,
} from '../form';
import { chainRevivers, dateReviver, optional, type Opt } from '@/utils';
import { Route } from '@/api';
import { SPACE } from '../css';
import { useApiContext } from '../api';

export * from './timesheet/hooks';

/** A reviver for {@link JSON.parse} on a {@link Timesheet}. */
const REVIVER = chainRevivers([
	dateReviver<Timesheet>('date_open'),
	optional(dateReviver<Timesheet>('date_close')),
]);

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Timesheet} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function TimesheetForm(props: BaseProps<Timesheet>): React.ReactElement {
	const [EMPLOYEE, setEmployee] = React.useState(props.initialValues?.employee);
	const [EXPENSES, setExpenses] = React.useState(props.initialValues?.expenses);
	const [JOB, setJob] = React.useState(props.initialValues?.job);
	const [TIME_BEGIN, setTimeBegin] = React.useState(props.initialValues?.time_begin);
	const [TIME_END, setTimeEnd] = React.useState(props.initialValues?.time_end);
	const [WORK_NOTES, setWorkNotes] = React.useState(props.initialValues?.work_notes);

	const [CLIENT, showMessage] = useApiContext();
	const [EMPLOYEE_HANDLER, setEmployeeIdHandler] = useEmployeeIdEventHandlers(props.id, setEmployee);
	const [EXPENSES_HANDLER, INPUT_DEPARTMENTS] = useIdInputs({
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
					{ args: [CLIENT, DATE_CLOSE, DATE_OPEN, DEPARTMENTS, INCREMENT, INVOICE, NOTES, OBJECTIVES] },
					isTimesheet,
					REVIVER,
				);

				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result: Timesheet = {
					...props.initialValues,
					client: CLIENT!,
					date_close: DATE_CLOSE,
					date_open: DATE_OPEN,
					departments: DEPARTMENTS as Department[],
					increment: INCREMENT,
					invoice: INVOICE!,
					notes: NOTES,
					objectives: OBJECTIVES,
				};
			}

			await Promise.resolve(props.onSubmit?.(result));
			setDateClose(undefined);
			setNotes('');
			setObjectives('');
		}}>
			<InputId
				id={`${props.id}--client`}
				label='Client'
				onAction={setEmployeeIdHandler}
				required={true}
				title='The client organization which this timesheet for'
				value={CLIENT?.id ?? ''}
			/>

			<InputDate
				id={`${props.id}--date--open`}
				label='Date Open'
				onChange={setDateOpen}
				required={true}
				title='The date that this timesheet was opened'
				value={DATE_OPEN}
			/>

			<InputDate
				id={`${props.id}--date--close`}
				label='Date Close'
				onChange={setDateClose}
				required={INVOICE?.date?.issued != undefined}
				title='The date that this timesheet was opened'
				value={DATE_CLOSE}
			/>

			{INPUT_DEPARTMENTS}

			<InputDuration
				id={`${props.id}--increment`}
				label='Increment'
				onChange={setIncrement}
				required={true}
				title="When working on this timesheet, timesheets' end time is rounded to the nearest whole according to this value"
				value={INCREMENT}
			/>

			<InputInvoice
				id={`${props.id}--invoice`}
				label='Invoice'
				onChange={setInvoice}
				value={INVOICE}
			/>

			<Textarea
				id={`${props.id}--objectives`}
				label='Objectives'
				onChange={setObjectives}
				required={true}
				title='What things must be accomplished before the timesheet can be considered "complete"'
				value={OBJECTIVES}
			/>

			<Textarea
				id={`${props.id}--notes`}
				label='Notes'
				onChange={setNotes}
				title='Miscellaneous, non-objective text'
				value={NOTES}
			/>

			<FormButton className={SPACE} />
		</Form>

		{EMPLOYEE_HANDLER}
		{EXPENSES_HANDLER}
	</>;
}
