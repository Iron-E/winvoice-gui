'use client';

import type { Currency, Money } from '@/schema';
import type { Match } from '@/match';
import { InputMoney } from '../../field/money';
import { InputMatch, InputMatchProps, type InputMatchField } from '../match';

const Input: InputMatchField<Money> = props => (
	<InputMoney {...props} label={props.label ?? 'Money'} />
);

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchId} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function InputMatchMoney(props: InputMatchProps<Match<Money>>): React.ReactElement {
	return <InputMatch {...props} defaultValue={{ amount: '', currency: '' as Currency }} inputField={Input} />;
}
