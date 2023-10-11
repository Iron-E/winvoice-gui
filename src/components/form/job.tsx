'use client';

import React from 'react';
import type { BaseProps } from './props';
import { chainRevivers, dateReviver, optional, type Maybe } from '@/utils';
import { Department, isJob, type Job } from '@/schema';
import { Form, FormButton } from '../form';
import { InputDate, InputDuration, InputId, InputInvoice, Textarea, useIdInputs } from './field';
import { Route } from '@/api';
import { SPACE } from '../css';
import { useApiContext } from '../api';
import { useDepartmentIdEventHandlers } from './department';
import { useOrganizationIdEventHandlers } from './organization';

export * from './job/hooks';

/** A reviver for {@link JSON.parse} on a {@link Job}. */
export const JOB_REVIVER = chainRevivers([
	dateReviver<Job>('date_open'),
	optional(dateReviver<Job>('date_close')),
]);

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Job} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function JobForm(props: BaseProps<Job>): React.ReactElement {
	const [CLIENT, setClient] = React.useState(props.initialValues?.client);
	const [DATE_CLOSE, setDateClose] = React.useState(props.initialValues?.date_close);
	const [DATE_OPEN, setDateOpen] = React.useState(props.initialValues?.date_open ?? new Date());
	const [DEPARTMENTS, setDepartments] = React.useState<Maybe<Department>[]>(props.initialValues?.departments ?? [undefined]);
	const [INCREMENT, setIncrement] = React.useState(props.initialValues?.increment ?? '');
	const [INVOICE, setInvoice] = React.useState(props.initialValues?.invoice);
	const [NOTES, setNotes] = React.useState(props.initialValues?.notes ?? '');
	const [OBJECTIVES, setObjectives] = React.useState(props.initialValues?.objectives ?? '');

	const [API_CLIENT, showMessage] = useApiContext();
	const [CLIENT_HANDLER, setClientIdEvent] = useOrganizationIdEventHandlers(props.id, setClient);
	const [DEPARTMENT_HANDLER, INPUT_DEPARTMENTS] = useIdInputs({
		id: `${props.id}--department`,
		label: 'Departments',
		onChange: departments => setDepartments(departments.length > 0 ? departments : [undefined]),
		useIdEventHandlers: useDepartmentIdEventHandlers,
		values: DEPARTMENTS,
	});

	return <>
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await API_CLIENT.post(
					showMessage,
					Route.Job,
					{ args: [CLIENT, DATE_CLOSE, DATE_OPEN, DEPARTMENTS, INCREMENT, INVOICE, NOTES, OBJECTIVES] },
					isJob,
					JOB_REVIVER,
				);

				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result: Job = {
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
				onAction={setClientIdEvent}
				required={true}
				title='The client organization which this job for'
				value={CLIENT?.id ?? ''}
			/>

			<InputDate
				id={`${props.id}--date--open`}
				label='Date Open'
				onChange={setDateOpen}
				required={true}
				title='The date that this job was opened'
				value={DATE_OPEN}
			/>

			<InputDate
				id={`${props.id}--date--close`}
				label='Date Close'
				onChange={setDateClose}
				required={INVOICE?.date?.issued != undefined}
				title='The date that this job was opened'
				value={DATE_CLOSE}
			/>

			{INPUT_DEPARTMENTS}

			<InputDuration
				id={`${props.id}--increment`}
				label='Increment'
				onChange={setIncrement}
				required={true}
				title="When working on this job, timesheets' end time is rounded to the nearest whole according to this value"
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
				placeholder='* Change a lightbulb'
				required={true}
				title='What things must be accomplished before the job can be considered "complete"'
				value={OBJECTIVES}
			/>

			<Textarea
				id={`${props.id}--notes`}
				label='Notes'
				onChange={setNotes}
				placeholder='* There was a fixture around the bulb, access it w/ XYZ'
				title='Miscellaneous, non-objective text'
				value={NOTES}
			/>

			<FormButton className={SPACE} />
		</Form>

		{CLIENT_HANDLER}
		{DEPARTMENT_HANDLER}
	</>;
}
