'use client';

import type { Match } from '@/match';
import { Checkbox } from '../../field';
import { InputMatch, InputMatchProps, type InputMatchField } from '../match';

const InputBool: InputMatchField<boolean> = props => (
	<Checkbox {...props} inputClassName='align-middle'>
		{props.label ?? 'Active'}
	</Checkbox>
);

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchId} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchBool(props: InputMatchProps<Match<boolean>>): React.ReactElement {
	return <InputMatch {...props} defaultValue={false} inputField={InputBool} />;
}
