'use client';

import React from 'react';
import { EmployeeForm, useEmployeeTable } from '@/components';

export default function Page(): React.ReactElement {
	const [ORDERED_DATA, TABLE] = useEmployeeTable();
	return <>
		{/* WARN: passing function (i.e. not using closure) changes 'this' context */}
		<EmployeeForm id='new-employee-form' onSubmit={e => ORDERED_DATA.append(e)} />
		{TABLE}
	</>;
}
