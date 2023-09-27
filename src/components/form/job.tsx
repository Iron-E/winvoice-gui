'use client';

import React from 'react';
import type { BaseProps } from './props';
import { DeleteIcon } from '../icons';
import { Department, isJob, type Job } from '@/schema';
import {
	Form,
	FormButton,
	InputDate,
	InputDuration,
	InputId,
	InputInvoice,
	LABEL_BUTTON_STYLE,
	Textarea,
	useDepartmentIdEventHandlers,
	useIdEventHandlers,
	useOrganizationIdEventHandlers,
} from '../form';
import { Route } from '@/api';
import { SPACE } from '../css';
import { useApiContext } from '../api';
import { Opt } from '@/utils';

/** Event handlers for a {@link Job} ID. */
export function useJobIdEventHandlers(
	id: string,
	setJob: Parameters<typeof useIdEventHandlers<Job>>[0],
): ReturnType<typeof useIdEventHandlers<Job>> {
	return useIdEventHandlers(setJob, p => <JobForm {...p} id={`${id}--organization--form`} />);
}

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Job} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function JobForm(props: BaseProps<Job>): React.ReactElement {
	const [CLIENT, setClient] = React.useState(props.initialValues?.client);
	const [DATE_CLOSE, setDateClose] = React.useState(props.initialValues?.date_close);
	const [DATE_OPEN, setDateOpen] = React.useState(props.initialValues?.date_open ?? new Date());
	const [DEPARTMENTS, setDepartments] = React.useState<Opt<Department>[]>(props.initialValues?.departments ?? [null]);
	const [INCREMENT, setIncrement] = React.useState(props.initialValues?.increment ?? '');
	const [INVOICE, setInvoice] = React.useState(props.initialValues?.invoice);
	const [NOTES, setNotes] = React.useState(props.initialValues?.notes ?? '');
	const [OBJECTIVES, setObjectives] = React.useState(props.initialValues?.objectives ?? '');

	const [API_CLIENT, showMessage] = useApiContext();
	const [INDEX, setIndex] = React.useState(-1);
	const [CLIENT_HANDLER, setClientIdEvent] = useOrganizationIdEventHandlers(props.id, setClient);
	const [DEPARTMENTS_HANDLER, setDepartmentIdEvent] = useDepartmentIdEventHandlers(props.id, d => {
		setDepartments(DEPARTMENTS.map((v, i) => i === INDEX ? d : v));
		setIndex(-1);
	});

	return <>
		<button onClick={() => setDepartments([...DEPARTMENTS, { id: '', name: '' }])}>
			Create
		</button>

		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await API_CLIENT.post(
					showMessage,
					Route.Job,
					{args: [CLIENT, DATE_CLOSE, DATE_OPEN, DEPARTMENTS, INCREMENT, INVOICE, NOTES, OBJECTIVES]},
					isJob,
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
				required={DATE_CLOSE != undefined}
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

			{DEPARTMENTS.map((d, i) => (
				<InputId
					id={`${props.id}--department-${i + 1}`}
					label={`Department${i > 0 ? ` ${i + 1}` : ''}`}
					onAction={action => {
						setIndex(i);
						setDepartmentIdEvent(action);
					}}
					required={true}
					title='A department assigned to this Job'
					value={d?.id ?? ''}
				>
					{DEPARTMENTS.length > 1 && (
						<FormButton
							className={LABEL_BUTTON_STYLE}
							onClick={() => setDepartments(DEPARTMENTS.filter((_, j) => j !== i))}
						>
							<DeleteIcon />
						</FormButton>
					)}
				</InputId>
			))}

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
				required={true}
				title='What things must be accomplished before the job can be considered "complete"'
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

		{CLIENT_HANDLER}
		{DEPARTMENTS_HANDLER}
	</>;
}
