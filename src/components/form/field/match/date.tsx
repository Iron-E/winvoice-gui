import type { Match, MatchOption } from '@/match';
import { InputDate } from '../../field';
import { InputMatch, InputMatchOption, InputMatchProps } from '../match';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchDate} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchDate(props: InputMatchProps<Match<Date>>): React.ReactElement {
	return <InputMatch {...props} defaultValue={undefined as unknown as Date} inputField={InputDate} />;
}

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchDate} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchOptionDate(props: InputMatchProps<MatchOption<Match<Date>>>): React.ReactElement {
	return <InputMatchOption {...props} inputField={InputMatchDate} />;
}
