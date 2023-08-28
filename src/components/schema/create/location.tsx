'use client';

import type { Id } from '../../props-with';
import React from 'react';
import { SelectCurrency } from './currency';
import { Currency, type Location } from '@/schema';
import { Form } from '../../form';
import { FLEX } from '../../css';

/** @return a {@link React.JSX.IntrinsicElements.form | form} which will create a new {@link Location} on submit. */
export function CreateLocationForm(props: Id): React.ReactElement {
	const [CURRENCY, setCurrency] = React.useState(Currency.Eur);
	const ID = props.id ?? 'create-location-form';

	return (
		<Form onSubmit={async () => {
			console.log('Unimplemented');
		}}>
			<SelectCurrency
				id={`${ID}-currency`}
				onChange={setCurrency}
				value={CURRENCY}
			/>
		</Form>
	);
}
