import React from 'react';
import type { InputMatchObjectProps } from './props';
import type { MatchOrganization } from '@/match';
import { InputMatchIdAndName } from './id-name';
import { InputMatchLocation } from './location';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchOrganization} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchOrganization(props: InputMatchObjectProps<MatchOrganization>): React.ReactElement {
	const VALUE = props.value ?? {};
	return <>
		<InputMatchIdAndName id={props.id} onChange={props.onChange} value={VALUE} />
		<InputMatchLocation
			id={`${props.id}--location`}
			onChange={location => props.onChange({ ...VALUE, location })}
			value={VALUE.location}
		/>
	</>;
}
