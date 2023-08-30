'use client';

import React from 'react';
import type { Props } from '@/utils';
import { Currency, type Location } from '@/schema';
import { Form, FormButton } from '../../form';
import { InputId } from './id';
import { InputString } from './string';
import { Modal } from '../../modal';
import { SelectCurrency } from './currency';
import { SPACE } from '../../css';

/** @return a {@link React.JSX.IntrinsicElements.form | form} which will create a new {@link Location} on submit. */
export function CreateLocationForm(
	props: Pick<Props<typeof Form>, 'onSubmit'> & Pick<Props<typeof SelectCurrency>, 'id'>,
): React.ReactElement {
	const [CURRENCY, setCurrency] = React.useState<Currency>();
	const [NAME, setName] = React.useState<string>();
	const [OUTER, setOuter] = React.useState<Location>();
	const [SHOW_CREATE_OUTER_FORM, setShowCreateOuterForm] = React.useState(false);

	return <>
		<Form onSubmit={props.onSubmit}>
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
				onNew={() => setShowCreateOuterForm(true)}
				onSearch={async () => { throw new Error("Unimplemented") }}
				required={true}
				title='The name of the location which is to be created'
				value={OUTER?.id}
			/>

			<FormButton className={SPACE} />
		</Form>

		{SHOW_CREATE_OUTER_FORM && <Modal onClose={() => setShowCreateOuterForm(false)}>
			<CreateLocationForm
				id='abcd'
				onSubmit={async () => {
				}}
			/>
		</Modal>}
	</>;
}
