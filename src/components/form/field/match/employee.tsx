'use client';

import React from 'react';
import type { InputMatchObjectProps } from './props';
import type { MatchEmployee } from '@/match';
import { BorderLabeledField } from '../border-labeled';
import { InputMatchBool } from './bool';
import { InputMatchDepartment } from './department';
import { InputMatchIdAndName } from './id-name';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchEmployee} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchEmployee(props: InputMatchObjectProps<MatchEmployee>): React.ReactElement {
	return <>
		<InputMatchBool
			id={`${props.id}--active`}
			label='Active'
			onChange={active => props.onChange({ ...props.value, active })}
			value={props.value.active ?? 'any'}
		/>

		<BorderLabeledField label='Department'>
			<InputMatchDepartment
				id={`${props.id}--department`}
				onChange={department => props.onChange({ ...props.value, department })}
				value={props.value.department ?? {}}
			/>
		</BorderLabeledField>

		<InputMatchIdAndName id={props.id} onChange={props.onChange} value={props.value} />
	</>;
}
