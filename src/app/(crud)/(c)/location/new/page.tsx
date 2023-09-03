'use client';

import React from 'react';
import { CreateLocationForm, LocationTable, useOrderedData } from '@/components';
import { Currency, Location } from '@/schema';

export default function Page(): React.ReactElement {
	const ORDERED_DATA = useOrderedData<Location>('name');

	const [INIT, setInit] = React.useState(false);
	if (INIT === false) {
		ORDERED_DATA.data.set([
			{
				id: '55a81cc7-2d7b-477c-afd7-35e3bf8f9994',
				name: 'shoenix',
				outer: { id: '9ff5e8fd-f05f-48c6-b155-93bdab5c91bd', name: 'Arizona' },
			},
			{
				id: '86822505-6282-4a57-b521-721d4102858f',
				name: 'Phoenix',
				outer: {
					id: '4060f712-304d-4067-bb54-0ebaf0719d52',
					name: 'Arizona',
					outer: {
						currency: Currency.Usd,
						id: 'd350237f-a5aa-4525-b702-e64a6c7aa9e9',
						name: 'USA',
						outer: {
							id: 'dc8ec01c-2c6f-406d-8d07-2b88fe97c1f5',
							name: 'Earth',
						},
					},
				},
			},
		]);
		setInit(true);
	}

	return <>
		<CreateLocationForm
			id='new-location-form'
			onSubmit={l => ORDERED_DATA.data.set([...ORDERED_DATA.data.get, l])}
		/>

		<LocationTable orderedData={ORDERED_DATA} />
	</>;
}
