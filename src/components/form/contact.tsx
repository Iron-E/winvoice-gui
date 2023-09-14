'use client';

import React from 'react';
import type { BaseProps } from './props';
import { Form, FormButton, InputString, LocationForm, } from '../form';
import { Route } from '@/api';
import { SPACE } from '../css';
import { SelectContactKind } from './field/contact-kind';
import { isContact, type Contact, type Location, ContactKinds } from '@/schema';
import { useApiContext } from '../api';

/**
 * @returns a {@link React.JSX.IntrinsicElements.form | form} which will either create a new {@link Contact} on submit (if `intialValues` is `undefined`), or simply call `onSubmit` with the result of the changes to the `initialValues` otherwise (to allow editing data).
 */
export function ContactForm(props: BaseProps<Contact>): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [KIND, setKind] = React.useState<ContactKinds>(
		(props.initialValues && Object.keys(props.initialValues).filter(k => k === 'label')[0] as ContactKinds) ?? 'email'
	);
	const [LABEL, setLabel] = React.useState(props.initialValues?.label ?? '');
	const [VALUE, setValue] = React.useState<Location | string>('');

	return (
		<Form onSubmit={async () => {
			if (props.initialValues == undefined) {
				const RESULT = await CLIENT.post(showMessage, Route.Contact, { args: [{ [KIND]: VALUE }, LABEL] }, isContact);
				if (RESULT === null) { return; }
				var result = RESULT;
			} else {
				var result: Contact = { ...props.initialValues, [KIND]: VALUE, label: LABEL };
			}

			await Promise.resolve(props.onSubmit?.(result));
			setKind('email');
			setLabel('');
			setValue('');
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
				onChange={setLabel}
				required={true}
				title='The name of the location which is to be created'
				value={LABEL}
			/>

			{KIND === 'address'
				? <LocationForm onSubmit={setValue} id={`${props.id}--value`} />
				: <InputString
					id={`${props.id}--value`}
					onChange={setValue}
					required={true}
					title='The name of the location which is to be created'
					value={VALUE as string}
				/>

			}

			<FormButton className={SPACE} />
		</Form>
	);
}
