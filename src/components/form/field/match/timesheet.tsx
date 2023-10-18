import React from 'react';
import type { InputMatchObjectProps } from './props';
import type { MatchTimesheet } from '@/match';
import { BorderLabeledField } from '../border-labeled';
import { InputMatchDate } from './date';
import { InputMatchEmployee } from './employee';
import { InputMatchId } from './id';
import { InputMatchJob } from './job';
import { InputMatchSetExpense } from './expense';
import { InputMatchStr } from '../match';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchTimesheet} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchTimesheet(props: InputMatchObjectProps<MatchTimesheet>): React.ReactElement {
	const VALUE = props.value ?? {};
	return <>
		<BorderLabeledField label='Employee'>
			<InputMatchEmployee
				id={`${props.id}--employee`}
				onChange={employee => props.onChange({ ...VALUE, employee })}
				value={VALUE.employee}
			/>
		</BorderLabeledField>

		<InputMatchSetExpense
			id={`${props.id}--expenses`}
			label='Expenses'
			onChange={expenses => props.onChange({ ...VALUE, expenses })}
			value={VALUE.expenses ?? 'any'}
		/>

		<InputMatchId
			id={`${props.id}--id`}
			onChange={id => props.onChange({ ...VALUE, id })}
			value={VALUE.id ?? 'any'}
		/>

		<BorderLabeledField label='Job'>
			<InputMatchJob
				id={`${props.id}--job`}
				onChange={job => props.onChange({ ...VALUE, job })}
				value={VALUE.job}
			/>
		</BorderLabeledField>

		<InputMatchDate
			id={`${props.id}--time-begin`}
			label='Time Begin'
			onChange={time_begin => props.onChange({ ...VALUE, time_begin })}
			value={VALUE.time_begin ?? 'any'}
		/>

		<InputMatchDate
			id={`${props.id}--time-end`}
			label='Time End'
			onChange={time_end => props.onChange({ ...VALUE, time_end })}
			value={VALUE.time_end ?? 'any'}
		/>

		<InputMatchStr
			id={`${props.id}--work-notes`}
			label='Work Notes'
			onChange={work_notes => props.onChange({ ...VALUE, work_notes })}
			value={VALUE.work_notes ?? 'any'}
		/>
	</>;
}
