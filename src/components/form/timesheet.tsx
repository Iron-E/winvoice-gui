'use client';

import React from 'react';
import type { BaseProps } from './props';
import { AddIcon, RemoveIcon } from '../icons';
import { BorderLabeledField } from './field/border-labeled';
import { chainRevivers, dateReviver, optional, type Maybe } from '@/utils';
import { expenseToValue, isTimesheet, type Expense, type Money, type Timesheet } from '@/schema';
import { Form } from '../form';
import { FormButton } from './button';
import { InputDate, InputId, Textarea } from './field';
import { InputExpense } from './field/expense';
import { JOB_REVIVER, useJobIdEventHandlers } from './job';
import { Route } from '@/api';
import { SPACE } from '../css';
import { useApiContext } from '../api';
import { useEmployeeIdEventHandlers } from './employee';

export * from './timesheet/hooks';

/** A reviver for {@link JSON.parse} on a {@link Timesheet}. */
export const TIMESHEET_REVIVER = chainRevivers([
	dateReviver<Timesheet>('time_begin'),
	optional(dateReviver<Timesheet>('time_end')),
	JOB_REVIVER,
]);

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Timesheet} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function TimesheetForm(props: BaseProps<Timesheet> & { showExpenses?: boolean }): React.ReactElement {
	const [EMPLOYEE, setEmployee] = React.useState(props.initialValues?.employee /* TODO: `?? CLIENT.employee` */);
	const [EXPENSES, setExpenses] = React.useState<Maybe<Expense>[]>(props.initialValues?.expenses ?? []);
	const [JOB, setJob] = React.useState(props.initialValues?.job);
	const [TIME_BEGIN, setTimeBegin] = React.useState(props.initialValues?.time_begin ?? new Date());
	const [TIME_END, setTimeEnd] = React.useState(props.initialValues?.time_end);
	const [WORK_NOTES, setWorkNotes] = React.useState(props.initialValues?.work_notes ?? '');

	const [CLIENT, showMessage] = useApiContext();
	const [EMPLOYEE_HANDLER, setEmployeeIdHandler] = useEmployeeIdEventHandlers(props.id, setEmployee);
	const [JOB_HANDLER, setJobIdHandler] = useJobIdEventHandlers(props.id, setJob);

	return <>
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.create(
					showMessage,
					Route.Timesheet,
					{ args: [EMPLOYEE, (EXPENSES as Expense[]).map(expenseToValue), JOB, TIME_BEGIN, TIME_END, WORK_NOTES] },
					isTimesheet,
					TIMESHEET_REVIVER,
				);

				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result: Timesheet = {
					...props.initialValues,
					employee: EMPLOYEE!,
					expenses: EXPENSES as Expense[],
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
				label='Employee'
				onAction={setEmployeeIdHandler}
				required={true}
				title='The employee who did the work on this timesheet'
				value={EMPLOYEE?.id ?? ''}
			/>

			<InputDate
				id={`${props.id}--time-begin`}
				label='Time Begin'
				onChange={setTimeBegin}
				required={true}
				title='The time that work began'
				value={TIME_BEGIN}
			/>

			<InputDate
				id={`${props.id}--time-end`}
				label='Time End'
				onChange={setTimeEnd}
				title='The time that work ended'
				value={TIME_END}
			/>

			{props.showExpenses !== false && (
				<BorderLabeledField
					button={props.initialValues == undefined
						? { onClick: () => setExpenses([...EXPENSES, undefined]), text: <AddIcon /> }
						: undefined
					}
					className='min-w-[41ch]'
					label='Expenses'
				>
					{EXPENSES.map((x, i) => (
						<BorderLabeledField
							button={{ onClick: () => setExpenses(EXPENSES.toSpliced(i, 1)), text: <RemoveIcon /> }}
							key={x?.id ?? i}
						>
							<InputExpense
								id={`${props.id}--expense-${i}`}
								onChange={value => setExpenses(EXPENSES.with(i, {
									category: value[0],
									cost: value[1],
									description: value[2],
									id: x?.id ?? crypto.randomUUID(),
									timesheet_id: props.initialValues?.id ?? '',
								}))}
								value={x as unknown as [string, Money, string]}
							/>
						</BorderLabeledField>
					))}
				</BorderLabeledField>
			)}

			<InputId
				id={`${props.id}--job`}
				label='Job'
				onAction={setJobIdHandler}
				required={true}
				title='The job this work was done under'
				value={JOB?.id ?? ''}
			/>

			<Textarea
				id={`${props.id}--work-notes`}
				label='Work Notes'
				onChange={setWorkNotes}
				placeholder={'* Took lightbulb from inventory\n* Changed client lightbulb'}
				required={true}
				title='What work on the job was done during this period of time'
				value={WORK_NOTES}
			/>

			<FormButton className={SPACE} />
		</Form>

		{EMPLOYEE_HANDLER}
		{JOB_HANDLER}
	</>;
}
