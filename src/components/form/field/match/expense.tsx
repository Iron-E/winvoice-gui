import React from 'react';
import type { InputMatchObjectProps } from './props';
import type { MatchExpense, MatchSet } from '@/match';
import { InputMatchProps, InputMatchSet, InputMatchStr } from '../match';
import { InputMatchMoney } from './money';
import { InputMatchId } from './id';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchExpense} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchExpense(props: InputMatchObjectProps<MatchExpense>): React.ReactElement {
	const VALUE = props.value ?? {};
	return <>
		<InputMatchStr
			id={`${props.id}--category`}
			label='Category'
			onChange={category => props.onChange({ ...VALUE, category })}
			value={VALUE.category ?? 'any'}
		/>

		<InputMatchMoney
			id={`${props.id}--cost`}
			label='Cost'
			onChange={cost => props.onChange({ ...VALUE, cost })}
			value={VALUE.cost ?? 'any'}
		/>

		<InputMatchStr
			id={`${props.id}--description`}
			label='Description'
			onChange={description => props.onChange({ ...VALUE, description })}
			value={VALUE.description ?? 'any'}
		/>

		<InputMatchId
			id={`${props.id}--id`}
			onChange={id => props.onChange({ ...VALUE, id })}
			value={VALUE.id ?? 'any'}
		/>

		<InputMatchId
			id={`${props.id}--timesheet-id`}
			label='Timesheet ID'
			onChange={timesheet_id => props.onChange({ ...VALUE, timesheet_id })}
			value={VALUE.timesheet_id ?? 'any'}
		/>
	</>;
}

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchExpense} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchSetExpense(props: InputMatchProps<MatchSet<MatchExpense>>): React.ReactElement {
	return <InputMatchSet {...props} inputField={InputMatchExpense} />;
}
