'use client';

import React from 'react';
import { LocationForm, useLocationTable } from '@/components';

export default function Page(): React.ReactElement {
	const [ORDERED_DATA, TABLE] = useLocationTable();

	return <>
		<LocationForm
			id='new-location-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={l => ORDERED_DATA.append(l)}
		/>

		{TABLE}
	</>;
}
