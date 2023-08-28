'use client';

import type { Id } from '../../props-with';
import React from 'react';
import { SelectCurrency } from './currency';
import { Currency, type Location } from '@/schema';
import { Form } from '../../form';

/** @return a {@link React.JSX.IntrinsicElements.form | form} which will create a new {@link Location} on submit. */
export function CreateLocationForm(props: Id): React.ReactElement {
	const [CURRENCY, setCurrency] = React.useState<Currency>();
	const ID = props.id ?? 'create-location-form';

	return (
		<Form className={`flex flex-col`} onSubmit={async () => {
			throw new Error('Unimplemented');
		}}>
			<SelectCurrency
				id={`${ID}-currency`}
				onChange={setCurrency}
				title='Select the currency which is used by this location, if it is different than surrounding locations'
				value={CURRENCY}
			/>
		</Form>
	);
}
