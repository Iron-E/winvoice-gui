'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Department, isJob, type Job } from '@/schema';
import {
	Form,
	FormButton,
	InputId,
	LABEL_BUTTON_STYLE,
	useDepartmentIdEventHandlers,
	useIdEventHandlers,
} from '../form';
import { Route } from '@/api';
import { useApiContext } from '../api';
import { DeleteIcon } from '../icons';

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
	const [DEPARTMENTS, setDepartments] = React.useState<Department[]>([]);
	const [INDEX, setIndex] = React.useState(-1);

	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setIdEvent] = useDepartmentIdEventHandlers(props.id, d => {
		setDepartments(DEPARTMENTS.map((v, i) => v.id === d.id || i === INDEX ? d : v));
		setIndex(-1);
	});

	return <>
		<button onClick={() => setDepartments([...DEPARTMENTS, { id: '', name: '' }])}>
			Create
		</button>

		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.post(showMessage, Route.Job, { args: [CURRENCY, NAME, OUTER] }, isJob);
				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result: Job = { ...props.initialValues, currency: CURRENCY, name: NAME, outer: OUTER };
			}

			await Promise.resolve(props.onSubmit?.(result));
			setName('');
		}}>
			{DEPARTMENTS.map((d, i) => (
				<InputId
					id={`department-${i + 1}`}
					label={`Department ${i + 1}`}
					onAction={action => {
						setIndex(i);
						setIdEvent(action);
					}}
					title='A department assigned to this Job'
					value={d.id}
				>
					<FormButton className={LABEL_BUTTON_STYLE} onClick={() => setDepartments(DEPARTMENTS.filter((_, j) => j !== i))}>
						<DeleteIcon />
					</FormButton>
				</InputId>
			))}
		</Form>

		{HANDLER}
	</>;
}
