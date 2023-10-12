'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Form } from '../form';
import { FormButton } from './button';
import { InputId, InputString, SelectCurrency } from './field';
import { isLocation, type Location } from '@/schema';
import { Route } from '@/api';
import { SPACE } from '../css';
import { useApiContext } from '../api';
import { useLocationIdEventHandlers } from './location/hooks';

export { useLocationIdEventHandlers };

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Location} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function LocationForm(props: BaseProps<Location>): React.ReactElement {
	const [CURRENCY, setCurrency] = React.useState(props.initialValues?.currency);
	const [NAME, setName] = React.useState(props.initialValues?.name ?? '');
	const [OUTER, setOuter] = React.useState(props.initialValues?.outer);

	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setIdEvent] = useLocationIdEventHandlers(props.id, setOuter);

	return <>
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.create(showMessage, Route.Location, { args: [CURRENCY, NAME, OUTER] }, isLocation);
				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result: Location = { ...props.initialValues, currency: CURRENCY, name: NAME, outer: OUTER };
			}

			await Promise.resolve(props.onSubmit?.(result));
			setName('');
		}}>
			<SelectCurrency
				id={`${props.id}--currency`}
				onChange={setCurrency}
				title='The currency used by this location, if it is different than surrounding locations'
				value={CURRENCY ?? ''}
			/>

			<InputString
				id={`${props.id}--name`}
				onChange={setName}
				placeholder='London'
				required={true}
				title='The name for the location which is to be created'
				value={NAME}
			/>

			<InputId
				id={`${props.id}--outer`}
				label='Outer Location'
				onAction={setIdEvent}
				title='The location outside this (e.g. Phoenix is outside Arizona)'
				value={OUTER?.id ?? ''}
			/>

			<FormButton className={SPACE} />
		</Form>

		{HANDLER}
	</>;
}
