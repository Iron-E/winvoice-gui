'use client';

import React from 'react';
import { CreateLocationForm, LocationTable } from '@/components';
import { Currency, Location } from '@/schema';

export default function Page(): React.ReactElement {
	const [CREATED, setCreated] = React.useState<Location[]>([
		{
			id: '3f5ae42b-9d6f-4810-97da-1ca6d6a1c09d',
			name: 'phoenix',
			outer: {
				id: 'e4f056a0-a5b5-40a0-9214-9353364faadb',
				name: 'Arizona',
			},
		},
		{
			id: 'cd4069b9-ebc5-4dbf-aa21-18df2bdf2743',
			name: 'Phoenix',
			outer: {
				id: 'e4f056a0-a5b5-40a0-9214-9353364faadb',
				name: 'Arizona',
				outer: {
					currency: Currency.Usd,
					id: 'e4f056a0-a5b5-40a0-9214-9353364faadb',
					name: 'USA',
					outer: {
						id: 'e4f056a0-a5b5-40a0-9214-9353364faadb',
						name: 'Earth',
					},
				},
			},
		},
	]);

	return <>
		<CreateLocationForm
			id='new-location-form'
			onSubmit={l => setCreated([...CREATED, l])}
		/>

		<LocationTable data={CREATED} />
	</>;
}
