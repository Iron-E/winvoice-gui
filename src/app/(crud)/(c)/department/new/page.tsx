'use client';

import React from 'react';
import { DepartmentForm, DepartmentTable, useOrderedData } from '@/components';
import { Department } from '@/schema';

export default function Page(): React.ReactElement {
	const ORDERED_DATA = useOrderedData<Department>('name');

	return <>
		<DepartmentForm
			id='new-department-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={d => ORDERED_DATA.append(d)}
		/>

		{ORDERED_DATA.data.length > 0 && (
			<DepartmentTable orderedData={ORDERED_DATA} />
		)}
	</>;
}
