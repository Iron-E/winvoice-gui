'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Form, FormButton, InputId, InputString, useLocationIdEventHandlers } from '../form';
import { isOrganization, type Organization } from '@/schema';
import { Route } from '@/api';
import { SPACE } from '../css';
import { useApiContext } from '../api';

export * from './organization/hooks';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Organization} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function OrganizationForm(props: BaseProps<Organization>): React.ReactElement {
	const [LOCATION, setLocation] = React.useState(props.initialValues?.location);
	const [NAME, setName] = React.useState(props.initialValues?.name ?? '');

	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setIdEvent] = useLocationIdEventHandlers(props.id, setLocation);

	return <>
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.post(showMessage, Route.Organization, { args: [LOCATION, NAME] }, isOrganization);
				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result = { ...props.initialValues, location: LOCATION!, name: NAME };
			}

			await Promise.resolve(props.onSubmit?.(result));
			setName('');
		}}>
			<InputId
				id={`${props.id}--location`}
				label='Location'
				onAction={setIdEvent}
				required={true}
				title='Where this organization is located'
				value={LOCATION?.id ?? ''}
			/>

			<InputString
				id={`${props.id}--name`}
				onChange={setName}
				placeholder='ACME Incorporated'
				required={true}
				title='The name of the organization'
				value={NAME}
			/>

			<FormButton className={SPACE} />
		</Form>

		{HANDLER}
	</>;
}
