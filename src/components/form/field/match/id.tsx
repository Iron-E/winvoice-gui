import type { Id } from '@/schema';
import type { Match } from '@/match';
import { Input } from '../../field';
import { InputMatch, InputMatchProps, type InputMatchField } from '../match';

const InputId: InputMatchField<Id> = props => (
	<Input
		{...props}
		inputClassName='min-w-[36ch]'
		label={props.label ?? 'Id'}
		placeholder='00000000-0000-0000-0000-000000000000'
	/>
);

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchId} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchId(props: InputMatchProps<Match<Id>>): React.ReactElement {
	return <InputMatch {...props} defaultValue='' inputField={InputId} label={props.label ?? 'ID'} />;
}
