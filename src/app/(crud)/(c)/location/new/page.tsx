'use client';

import React from 'react';
import { CreateLocationForm, LocationTable, locationValuators, useLocationOrder, useOrderedData } from '@/components';
import { Currency, Location } from '@/schema';

export default function Page(): React.ReactElement {
	const [OUTER_ORDER, setOuterOrder] = useLocationOrder();
	const ORDERED_DATA = useOrderedData<Location>('name', locationValuators(OUTER_ORDER.column));

	const [INIT, setInit] = React.useState(false);
	if (INIT === false) {
		ORDERED_DATA.setData?.([
			{
				id: '55a81cc7-2d7b-477c-afd7-35e3bf8f9994',
				name: 'shoenix',
				outer: {
					id: 'd350237f-a5aa-4525-b702-e64a6c7aa9e9',
					name: 'Arizona',
				},
			},
			{
				id: '4060f712-304d-4067-bb54-0ebaf0719d52',
				name: 'arizona',
				outer: {
					currency: Currency.Usd,
					id: '9ff5e8fd-f05f-48c6-b155-93bdab5c91bd',
					name: 'USA',
					outer: {
						id: 'dc8ec01c-2c6f-406d-8d07-2b88fe97c1f5',
						name: 'Earth',
						outer: {
							name: 'Milky Way',
							id: '1c7efea1-b4e2-42ca-b94e-239f02499176',
							outer: {
								name: 'asdlkjasldkj',
								id: 'gdlkjfgkjhfghk',
							},
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
			onSubmit={ORDERED_DATA.appendData}
		/>

		<LocationTable
			onReorderOuter={order => {
				setOuterOrder(order);
				ORDERED_DATA.refresh(locationValuators(order.column));
			}}
			orderedData={ORDERED_DATA}
			outerOrder={OUTER_ORDER}
		/>
	</>;
}
