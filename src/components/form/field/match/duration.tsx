import type { Match } from '@/match';
import { InputDuration } from '../../field';
import { InputMatch, InputMatchProps } from '../match';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchId} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchDuration(props: InputMatchProps<Match<string>>): React.ReactElement {
	return <InputMatch {...props} defaultValue='' inputField={InputDuration} />;
}
