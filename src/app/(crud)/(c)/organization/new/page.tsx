'use client';

import React from 'react';
import type { Organization } from '@/schema';
import { OrganizationForm, OrganizationTable, organizationValuators, useLocationOrder, useOrderedData } from '@/components';

export default function Page(): React.ReactElement {
	const [LOCATION_ORDER, setLocationOrder] = useLocationOrder();
	const [OUTER_ORDER, setOuterOrder] = useLocationOrder();

	const KEYS = {
		location: LOCATION_ORDER.column,
		outerLocation: OUTER_ORDER.column,
	} as const;
	const [ORDERED_DATA, swapKey] = useOrderedData<Organization, typeof KEYS>('name', organizationValuators, KEYS);

	return <>
		<OrganizationForm
			id='new-location-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={o => ORDERED_DATA.append(o)}
		/>

		{ORDERED_DATA.data.length > 0 && (
			<OrganizationTable
				locationOrder={LOCATION_ORDER}
				onReorderLocation={ORDERED_DATA.refreshOnReorder(setLocationOrder, swapKey('location'))}
				onReorderOuterLocation={ORDERED_DATA.refreshOnReorder(setOuterOrder, swapKey('outerLocation'))}
				orderedData={ORDERED_DATA}
				outerLocationOrder={LOCATION_ORDER}
			/>
		)}
	</>;
}
