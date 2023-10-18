import React from 'react';
import type { InputMatchObjectProps } from './props';
import type { MatchJob } from '@/match';
import { BorderLabeledField } from '../border-labeled';
import { InputMatchOrganization } from './organization';
import { InputMatchDate } from './date';
import { InputMatchSetDepartment } from './department';
import { InputMatchId } from './id';
import { InputMatchDuration } from './duration';
import { InputMatchInvoice } from './invoice';
import { InputMatchStr } from '../match';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchJob} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchJob(props: InputMatchObjectProps<MatchJob>): React.ReactElement {
	const VALUE = props.value ?? {};
	return <>
		<BorderLabeledField label='Client'>
			<InputMatchOrganization
				id={`${props.id}--client`}
				onChange={client => props.onChange({ ...VALUE, client })}
				value={VALUE.client}
			/>
		</BorderLabeledField>

		<InputMatchDate
			id={`${props.id}--date--open`}
			label='Date Open'
			onChange={date_open => props.onChange({ ...VALUE, date_open })}
			value={VALUE.date_open ?? 'any'}
		/>

		<InputMatchDate
			id={`${props.id}--date--close`}
			label='Date Close'
			onChange={date_close => props.onChange({ ...VALUE, date_close })}
			value={VALUE.date_close ?? 'any'}
		/>

		<InputMatchSetDepartment
			id={`${props.id}--departments`}
			label='Departments'
			onChange={departments => props.onChange({ ...VALUE, departments })}
			value={VALUE.departments ?? 'any'}
		/>

		<InputMatchId
			id={`${props.id}--id`}
			onChange={id => props.onChange({ ...VALUE, id })}
			value={VALUE.id ?? 'any'}
		/>

		<InputMatchDuration
			id={`${props.id}--increment`}
			label='Increment'
			onChange={increment => props.onChange({ ...VALUE, increment })}
			value={VALUE.increment ?? 'any'}
		/>

		<BorderLabeledField label='Invoice'>
			<InputMatchInvoice
				id={`${props.id}--invoice`}
				onChange={invoice => props.onChange({ ...VALUE, invoice })}
				value={VALUE.invoice}
			/>
		</BorderLabeledField>

		<InputMatchStr
			id={`${props.id}--notes`}
			label='Notes'
			onChange={notes => props.onChange({ ...VALUE, notes })}
			value={VALUE.notes ?? 'any'}
		/>

		<InputMatchStr
			id={`${props.id}--objectives`}
			label='Objectives'
			onChange={objectives => props.onChange({ ...VALUE, objectives })}
			value={VALUE.objectives ?? 'any'}
		/>
	</>;
}
