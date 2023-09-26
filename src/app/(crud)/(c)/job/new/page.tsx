'use client';

import React from 'react';
import type { Job } from '@/schema';
import { JobForm, useOrderedData } from '@/components';

export default function Page(): React.ReactElement {
	const ORDERED_DATA = useOrderedData<Job>('date_open', /* TODO: jobValuators(…) */);

	return <>
		<JobForm
			id='new-location-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={j => ORDERED_DATA.append(j)}
		/>

		{ORDERED_DATA.data.length > 0 && (<>{/* TODO: <JobTable /> */}</>)}
	</>;
}
