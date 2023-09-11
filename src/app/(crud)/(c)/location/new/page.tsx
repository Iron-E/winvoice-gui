'use client';

import React from 'react';
import { CreateLocationForm, LocationTable, locationValuators, useLocationOrder, useOrderedData } from '@/components';
import { Location } from '@/schema';

export default function Page(): React.ReactElement {
	const [OUTER_ORDER, setOuterOrder] = useLocationOrder();
	const ORDERED_DATA = useOrderedData<Location>('name', locationValuators(OUTER_ORDER.column));

	return <>
		<CreateLocationForm
			id='new-location-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={l => ORDERED_DATA.appendData(l)}
		/>

		{ORDERED_DATA.data.length > 0 && (
			<LocationTable
				onReorderOuter={order => {
					setOuterOrder(order);
					ORDERED_DATA.refresh(locationValuators(order.column));
				}}
				orderedData={ORDERED_DATA}
				outerOrder={OUTER_ORDER}
			/>
		)}
	</>;
}
