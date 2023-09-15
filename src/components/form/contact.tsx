'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Form, FormButton, Input, InputId, InputString, useLocationIdEventHandlers } from '../form';
import { Route } from '@/api';
import { SPACE } from '../css';
import { SelectContactKind } from './field/contact-kind';
import { isContact, type Contact, type Location, ContactKinds } from '@/schema';
import { useApiContext } from '../api';
import { Maybe } from '@/utils';

const KIND_INPUT_LABELS: Record<ContactKinds, string> = {
	address: 'Location',
	email: 'Email address',
	other: 'Other information',
	phone: 'Phone number',
};

const KIND_INPUT_TITLES: Record<ContactKinds, string> = {
	address: 'The physical address',
	email: 'The email address',
	other: 'The other information',
	phone: 'The phone number; digits (0–9) and dashes ("-") only',
};

const KIND_INPUT_TYPES: Partial<Record<ContactKinds, React.HTMLInputTypeAttribute>> = {
	email: 'email',
	phone: 'tel',
};

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Contact} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function ContactForm(props: BaseProps<Contact>): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();

	type InitialKind = Maybe<[ContactKinds, Location | string]>;
	const INITIAL_KIND  = props.initialValues && Object.entries(props.initialValues).reduce<InitialKind>(
		(previous_entry, entry) => (entry[0] === 'label' ? previous_entry : entry) as InitialKind,
		undefined,
	);

	const [KIND, setKind] = React.useState(INITIAL_KIND?.[0] ?? 'email');
	const [LABEL, setLabel] = React.useState(props.initialValues?.label ?? '');
	const [VALUE, setValue] = React.useState(INITIAL_KIND?.[1] ?? '');
	const [HANDLER, setIdEvent] = useLocationIdEventHandlers(props.id, setValue);

	return <>
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.post(showMessage, Route.Contact, { args: [{ [KIND]: VALUE }, LABEL] }, isContact);
				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result = { [KIND]: VALUE, label: LABEL } as Contact;
			}

			await Promise.resolve(props.onSubmit?.(result));
			setLabel('');
			setValue(KIND === 'address' ? {id: '', name: ''} : '');
		}}>
			<SelectContactKind
				id={`${props.id}--kind`}
				onChange={k => {
					if (KIND === 'address' && k !== 'address') {
						setValue('');
					} else if (KIND !== 'address' && k === 'address') {
						setValue({ id: '', name: '' });
					}

					setKind(k);
				}}
				title='The currency which is used by this location, if it is different than surrounding locations'
				value={KIND}
			/>

			<InputString
				id={`${props.id}--label`}
				label='Label'
				onChange={setLabel}
				required={true}
				title='The name of the location which is to be created'
				value={LABEL}
			/>

			{KIND === 'address'
				? <InputId
					id={`${props.id}--address`}
					label={KIND_INPUT_LABELS[KIND]}
					onNew={setIdEvent}
					onSearch={setIdEvent}
					required={true}
					title={KIND_INPUT_TITLES.address}
					value={(VALUE as Location).id}
				/>
				: <Input
					id={`${props.id}--${KIND}`}
					label={KIND_INPUT_LABELS[KIND]}
					onChange={setValue}
					pattern={KIND === 'phone' ? '^[0-9\\- ]+$' : undefined}
					required={true}
					title={KIND_INPUT_TITLES[KIND]}
					type={KIND_INPUT_TYPES[KIND] ?? 'text'}
					value={VALUE as string}
				/>

			}

			<FormButton className={SPACE} />
		</Form>

		{HANDLER}
	</>;
}
