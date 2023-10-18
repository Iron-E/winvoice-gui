import React from 'react';
import type { InputMatchObjectProps } from './props';
import type { MatchEmployee, MatchOption } from '@/match';
import { BorderLabeledField } from '../border-labeled';
import { InputMatchBool } from './bool';
import { InputMatchDepartment } from './department';
import { InputMatchIdAndName } from './id-name';
import { InputMatchOption, InputMatchProps } from '../match';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchEmployee} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchEmployee(props: InputMatchObjectProps<MatchEmployee>): React.ReactElement {
	const VALUE = props.value ?? {};
	return <>
		<InputMatchBool
			id={`${props.id}--active`}
			label='Active'
			onChange={active => props.onChange({ ...VALUE, active })}
			value={VALUE.active ?? 'any'}
		/>

		<BorderLabeledField label='Department'>
			<InputMatchDepartment
				id={`${props.id}--department`}
				onChange={department => props.onChange({ ...VALUE, department })}
				value={VALUE.department}
			/>
		</BorderLabeledField>

		<InputMatchIdAndName id={props.id} onChange={props.onChange} value={VALUE} />
	</>;
}

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchEmployee} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchOptionEmployee(props: InputMatchProps<MatchOption<MatchEmployee>>): React.ReactElement {
	return <InputMatchOption {...props} inputField={InputMatchEmployee} />;
}
