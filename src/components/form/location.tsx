'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Form, FormButton, InputId, InputString, useIdEventHandlers } from '../form';
import { Route } from '@/api';
import { SPACE } from '../css';
import { SelectCurrency } from '../form';
import { isLocation, type Location } from '@/schema';
import { useApiContext } from '../api';

/** Event handlers for a {@link Location} ID. */
export function useLocationIdEventHandlers(
	id: string,
	setLocation: Parameters<typeof useIdEventHandlers<Location>>[0],
): ReturnType<typeof useIdEventHandlers<Location>> {
	return useIdEventHandlers(
		setLocation,
		p => <LocationForm {...p} id={`${id}--location--form`} />,
	);
}

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Location} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function LocationForm(props: BaseProps<Location>): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();

	const [CURRENCY, setCurrency] = React.useState(props.initialValues?.currency);
	const [NAME, setName] = React.useState(props.initialValues?.currency ?? '');
	const [OUTER, setOuter] = React.useState(props.initialValues?.outer);
	const [HANDLER, setIdEvent] = useLocationIdEventHandlers(props.id, setOuter);

	return <>
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.post(showMessage, Route.Location, { args: [CURRENCY, NAME, OUTER] }, isLocation);
				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result: Location = { ...props.initialValues, currency: CURRENCY, name: NAME, outer: OUTER };
			}

			await Promise.resolve(props.onSubmit?.(result));
			setCurrency(undefined);
			setName('');
			setOuter(undefined);
		}}>
			<SelectCurrency
				id={`${props.id}--currency`}
				onChange={setCurrency}
				title='The currency used by this location, if it is different than surrounding locations'
				value={CURRENCY}
			/>

			<InputString
				id={`${props.id}--name`}
				onChange={setName}
				required={true}
				title='The name for the location which is to be created'
				value={NAME}
			/>

			<InputId
				id={`${props.id}--outer`}
				label='Outer Location'
				onNew={setIdEvent}
				onSearch={setIdEvent}
				title='The location outside this one'
				value={OUTER?.id ?? ''}
			/>

			<FormButton className={SPACE} />
		</Form>

		{HANDLER}
	</>;
}
