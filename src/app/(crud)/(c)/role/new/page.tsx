'use client';

import React from 'react';
import type { Role } from '@/schema';
import { ROLE_VALUATORS, RoleForm, RoleTable, useOrderedData } from '@/components';

export default function Page(): React.ReactElement {
	const ORDERED_DATA = useOrderedData<Role>('name', ROLE_VALUATORS);

	return <>
		<RoleForm
			id='new-role-form'
			// WARN: passing function (i.e. not using closure) changes 'this' context
			onSubmit={d => ORDERED_DATA.append(d)}
		/>

		{ORDERED_DATA.data.length > 0 && (
			<RoleTable orderedData={ORDERED_DATA} />
		)}
	</>;
}
