'use client';

import type { Id } from '../../props-with';
import React from 'react';
import { SelectCurrency } from './currency';
import { Currency, type Location } from '@/schema';
import { Form } from '../../form';

/** @return a {@link React.JSX.IntrinsicElements.form | form} which will create a new {@link Location} on submit. */
export function CreateLocationForm(props: Id): React.ReactElement {
	const [CURRENCY, setCurrency] = React.useState(Currency.Eur);
	const ID = props.id ?? 'create-location-form';

	return (
		<Form className={`flex flex-col`} onSubmit={async () => {
			throw new Error('Unimplemented');
		}}>
			<SelectCurrency
				id={`${ID}-currency`}
				onChange={setCurrency}
				value={CURRENCY}
			/>
		</Form>
	);
}
