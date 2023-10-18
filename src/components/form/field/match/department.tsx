import React from 'react';
import type { InputMatchObjectProps } from './props';
import { InputMatchSet, type InputMatchProps } from '../match';
import type { MatchDepartment, MatchSet } from '@/match';
import { InputMatchIdAndName } from './id-name';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchDepartment} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchDepartment(props: InputMatchObjectProps<MatchDepartment>): React.ReactElement {
	return <InputMatchIdAndName {...props} />;
}

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchDepartment} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchSetDepartment(props: InputMatchProps<MatchSet<MatchDepartment>>): React.ReactElement {
	return <InputMatchSet {...props} inputField={InputMatchDepartment} />;
}
