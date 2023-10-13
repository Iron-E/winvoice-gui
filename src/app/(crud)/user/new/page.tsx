'use client';

import React from 'react';
import { UserForm, useUserTable } from '@/components';

export default function Page(): React.ReactElement {
	const [ORDERED_DATA, TABLE] = useUserTable();
	return <>
		{/* WARN: passing function (i.e. not using closure) changes 'this' context */}
		<UserForm id='new-employee-form' onSubmit={e => ORDERED_DATA.append(e)} />
		{TABLE}
	</>;
}
