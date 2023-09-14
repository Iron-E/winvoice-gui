'use client';

import React from 'react';
import { Contact } from '@/schema';
import { ContactForm, ContactTable, contactValuators, useLocationOrder, useOrderedData } from '@/components';

export default function Page(): React.ReactElement {
	const [OUTER_ORDER, setOuterOrder] = useLocationOrder();
	const ORDERED_DATA = useOrderedData<Contact>('label', contactValuators(OUTER_ORDER.column));

	return <>
		<ContactForm
			id='new-location-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={c => ORDERED_DATA.append(c)}
		/>

		{ORDERED_DATA.data.length > 0 && (
			<ContactTable
				onReorderOuter={order => {
					setOuterOrder(order);
					ORDERED_DATA.refresh(contactValuators(order.column));
				}}
				orderedData={ORDERED_DATA}
				outerOrder={OUTER_ORDER}
			/>
		)}
	</>;
}
