'use client';

import React from 'react';
import type { Organization } from '@/schema';
import { OrganizationForm, OrganizationTable, organizationValuators, useLocationOrder, useOrderedData } from '@/components';

export default function Page(): React.ReactElement {
	const [LOCATION_ORDER, setLocationOrder] = useLocationOrder();
	const [OUTER_ORDER, setOuterOrder] = useLocationOrder();
	const ORDERED_DATA = useOrderedData<Organization>('name', organizationValuators(
		LOCATION_ORDER.column,
		OUTER_ORDER.column,
	));

	return <>
		<OrganizationForm
			id='new-location-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={o => ORDERED_DATA.append(o)}
		/>

		{ORDERED_DATA.data.length > 0 && (
			<OrganizationTable
				locationOrder={LOCATION_ORDER}
				onReorderLocation={order => {
					setLocationOrder(order);
					ORDERED_DATA.refresh(organizationValuators(order.column, OUTER_ORDER.column));
				}}
				onReorderOuterLocation={order => {
					setOuterOrder(order);
					ORDERED_DATA.refresh(organizationValuators(LOCATION_ORDER.column, order.column));
				}}
				orderedData={ORDERED_DATA}
				outerLocationOrder={LOCATION_ORDER}
			/>
		)}
	</>;
}
