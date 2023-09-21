'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Form, FormButton, InputId, InputString, useIdEventHandlers, useLocationIdEventHandlers } from '../form';
import { Route } from '@/api';
import { SPACE } from '../css';
import { isOrganization, type Organization } from '@/schema';
import { useApiContext } from '../api';

/** Event handlers for a {@link Organization} ID. */
export function useOrganizationIdEventHandlers(
	id: string,
	setOrganization: Parameters<typeof useIdEventHandlers<Organization>>[0],
): ReturnType<typeof useIdEventHandlers<Organization>> {
	return useIdEventHandlers(setOrganization, p => <OrganizationForm {...p} id={`${id}--organization--form`} />);
}

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
