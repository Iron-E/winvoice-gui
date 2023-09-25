'use client';

import React from 'react';
import type { Contact } from '@/schema';
import { ContactForm, ContactTable, contactValuators, useLocationOrder, useOrderedData } from '@/components';

export default function Page(): React.ReactElement {
	const [ADDRESS_ORDER, setAddressOrder] = useLocationOrder();
	const [OUTER_ADDRESS_ORDER, setOuterAddressOrder] = useLocationOrder();
	const ORDERED_DATA = useOrderedData<Contact>('label', contactValuators(
		ADDRESS_ORDER.column,
		OUTER_ADDRESS_ORDER.column,
	));

	return <>
		<ContactForm
			id='new-location-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={c => ORDERED_DATA.append(c)}
		/>

		{ORDERED_DATA.data.length > 0 && (
			<ContactTable
				addressOrder={ADDRESS_ORDER}
				onReorderAddress={order => {
					setAddressOrder(order);
					ORDERED_DATA.refresh(contactValuators(order.column, OUTER_ADDRESS_ORDER.column));
				}}
				onReorderOuterAddress={order => {
					setOuterAddressOrder(order);
					ORDERED_DATA.refresh(contactValuators(ADDRESS_ORDER.column, order.column));
				}}
				orderedData={ORDERED_DATA}
				outerAddressOrder={OUTER_ADDRESS_ORDER}
			/>
		)}
	</>;
}
