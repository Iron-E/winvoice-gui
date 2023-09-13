'use client';

import React from 'react';
import { DepartmentForm, DepartmentTable, locationValuators, useDepartmentOrder, useOrderedData } from '@/components';
import { Department } from '@/schema';

export default function Page(): React.ReactElement {
	const [OUTER_ORDER, setOuterOrder] = useDepartmentOrder();
	const ORDERED_DATA = useOrderedData<Department>('name', locationValuators(OUTER_ORDER.column));

	return <>
		<DepartmentForm
			id='new-location-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={d => ORDERED_DATA.append(d)}
		/>

		{ORDERED_DATA.data.length > 0 && (
			<DepartmentTable
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
