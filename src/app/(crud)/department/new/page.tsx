'use client';

import React from 'react';
import { DepartmentForm, useDepartmentTable } from '@/components';

export default function Page(): React.ReactElement {
	const [ORDERED_DATA, TABLE] = useDepartmentTable();
	return <>
		{/* WARN: passing function (i.e. not using closure) changes 'this' context */}
		<DepartmentForm id='new-department-form' onSubmit={d => ORDERED_DATA.append(d)} />
		{TABLE}
	</>;
}
