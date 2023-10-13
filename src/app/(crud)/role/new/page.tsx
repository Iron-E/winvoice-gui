'use client';

import React from 'react';
import { RoleForm, useRoleTable } from '@/components';

export default function Page(): React.ReactElement {
	const [ORDERED_DATA, TABLE] = useRoleTable();
	return <>
		{/* WARN: passing function (i.e. not using closure) changes 'this' context */}
		<RoleForm id='new-role-form' onSubmit={d => ORDERED_DATA.append(d)} />
		{TABLE}
	</>;
}
