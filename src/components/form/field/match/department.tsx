'use client';

import React from 'react';
import type { CompositeProps } from '../props';
import type { MatchDepartment } from '@/match';
import { InputMatchStr } from '../match';
import { InputMatchId } from './id';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchDepartment} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchDepartment(props: Required<CompositeProps<MatchDepartment>>): React.ReactElement {
	return <>
		<InputMatchId
			id={`${props.id}--id`}
			label='Id'
			onChange={value => props.onChange({ ...props.value, id: value })}
			value={props.value.id ?? 'any'}
		/>

		<InputMatchStr
			id={`${props.id}--name`}
			label='Name'
			onChange={value => props.onChange({ ...props.value, name: value })}
			value={props.value.name ?? 'any'}
		/>
	</>;
}
