'use client';

import React from 'react';
import type { On } from '../props-with';
import type { Props } from '@/utils';
import { Client } from '../api';
import { Form, FormButton, InputId, InputString } from '../form';
import { isLocation, type Location } from '@/schema';
import { Route } from '@/api';
import { SelectCurrency } from '../form';
import { SHOW_MESSAGE_CONTEXT } from '../messages';
import { SPACE } from '../css';
import { useIdEventHandlers } from './field/id';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Location} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function LocationForm<Ret>(props:
	& On<'submit', [l: Location], Ret>
	& Pick<Props<typeof SelectCurrency>, 'id'>
	& { initialValues?: Location }
): React.ReactElement {
	const CLIENT = React.useContext(Client.CONTEXT);
	const showMessage = React.useContext(SHOW_MESSAGE_CONTEXT);

	const INITIAL_CURRENCY = props.initialValues?.currency;
	const [CURRENCY, setCurrency] = React.useState(INITIAL_CURRENCY);

	const INITIAL_NAME = props.initialValues?.name ?? '';
	const [NAME, setName] = React.useState(INITIAL_NAME);

	const INITIAL_OUTER = props.initialValues?.outer;
	const [OUTER, setOuter] = React.useState(INITIAL_OUTER);

	const [HANDLER, setIdEvent] = useIdEventHandlers(
		setOuter,
		p => <LocationForm {...p} id={`${props.id}--outer--form`} />,
	);

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
			setCurrency(INITIAL_CURRENCY);
			setName(INITIAL_NAME);
			setOuter(INITIAL_OUTER);
		}}>
			<SelectCurrency
				id={`${props.id}--currency`}
				onChange={setCurrency}
				title='The currency which is used by this location, if it is different than surrounding locations'
				value={CURRENCY}
			/>

			<InputString
				id={`${props.id}--name`}
				onChange={setName}
				required={true}
				title='The name of the location which is to be created'
				value={NAME}
			/>

			<InputId
				id={`${props.id}--outer`}
				label='Outer Location'
				onNew={setIdEvent}
				onSearch={setIdEvent}
				required={true}
				title='The name of the location which is to be created'
				value={OUTER?.id ?? ''}
			/>

			<FormButton className={SPACE} />
		</Form>

		{HANDLER}
	</>;
}
