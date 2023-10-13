'use client';

import React from 'react';
import { JobForm, useJobTable } from '@/components';

export default function Page(): React.ReactElement {
	const [ORDERED_DATA, TABLE] = useJobTable();
	return <>
		{/* WARN: passing function (i.e. not using closure) changes 'this' context */}
		<JobForm id='new-job-form' onSubmit={j => ORDERED_DATA.append(j)} />
		{TABLE}
	</>;
}
