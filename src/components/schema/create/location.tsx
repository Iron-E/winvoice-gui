'use client';

import React from 'react';
import type { Props } from '@/utils';
import { Currency, type Location } from '@/schema';
import { Form } from '../../form';
import { SelectCurrency } from './currency';
import { SPACE } from '../../css';

/** @return a {@link React.JSX.IntrinsicElements.form | form} which will create a new {@link Location} on submit. */
export function CreateLocationForm(
	props: Pick<Props<typeof Form>, 'onSubmit'> & Pick<Props<typeof SelectCurrency>, 'id'>,
): React.ReactElement {
	const [CURRENCY, setCurrency] = React.useState<Currency>();
	return (
		<Form onSubmit={props.onSubmit}>
			<SelectCurrency
				id={`${props.id}--currency`}
				onChange={setCurrency}
				title='Select the currency which is used by this location, if it is different than surrounding locations'
				value={CURRENCY}
			/>

			<button className={`${SPACE} bg-gray-300`}>
				Create
			</button>
		</Form>
	);
}
