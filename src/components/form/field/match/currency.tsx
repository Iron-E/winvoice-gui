'use client';

import { Currency } from '@/schema';
import type { Match, MatchOption } from '@/match';
import { InputMatch, InputMatchProps, type InputMatchField, InputMatchOption } from '../match';
import { SelectCurrency } from '../../field';

const InputCurrency: InputMatchField<Currency> = props => (
	<SelectCurrency
		{...props}
		onChange={value => props.onChange(value ?? Currency.Eur)}
		label={props.label ?? 'Currency'}
	/>
);

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchId} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function SelectMatchCurrency(props: InputMatchProps<Match<Currency>>): React.ReactElement {
	return <InputMatch
		{...props}
		inputField={InputCurrency}
		onChange={value => props.onChange(value ?? Currency.Eur)}
	/>;
}

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link MatchId} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function SelectMatchOptionCurrency(props: InputMatchProps<MatchOption<Match<Currency>>>): React.ReactElement {
	return <InputMatchOption
		{...props}
		inputField={SelectMatchCurrency}
		onChange={value => props.onChange(value ?? 'any')}
	/>;
}
