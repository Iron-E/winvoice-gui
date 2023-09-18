'use client';

import React from 'react';
import type { Location } from '@/schema';
import { LocationForm, LocationTable, locationValuators, useLocationOrder, useOrderedData } from '@/components';

export default function Page(): React.ReactElement {
	const [OUTER_ORDER, setOuterOrder] = useLocationOrder();
	const ORDERED_DATA = useOrderedData<Location>('name', locationValuators(OUTER_ORDER.column));

	return <>
		<LocationForm
			id='new-location-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={l => ORDERED_DATA.append(l)}
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
