'use client';

import React from 'react';
import type { Contact } from '@/schema';
import { ContactForm, ContactTable, contactValuators, useLocationOrder, useOrderedData } from '@/components';

export default function Page(): React.ReactElement {
	const [ADDRESS_ORDER, setAddressOrder] = useLocationOrder();
	const [OUTER_ADDRESS_ORDER, setOuterAddressOrder] = useLocationOrder();

	const KEYS = {
		address: ADDRESS_ORDER.column,
		outerAddress: OUTER_ADDRESS_ORDER.column,
	} as const;
	const [ORDERED_DATA, swapKey] = useOrderedData<Contact, typeof KEYS>('label', contactValuators, KEYS);
	return <>
		<ContactForm
			id='new-location-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={c => ORDERED_DATA.append(c)}
		/>

		{ORDERED_DATA.data.length > 0 && (
			<ContactTable
				addressOrder={ADDRESS_ORDER}
				onReorderAddress={ORDERED_DATA.refreshOnReorder(setAddressOrder, swapKey('address'))}
				onReorderOuterAddress={ORDERED_DATA.refreshOnReorder(setOuterAddressOrder, swapKey('outerAddress'))}
				orderedData={ORDERED_DATA}
				outerAddressOrder={OUTER_ADDRESS_ORDER}
			/>
		)}
	</>;
}
