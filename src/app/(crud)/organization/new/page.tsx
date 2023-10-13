'use client';

import React from 'react';
import { OrganizationForm, useOrganizationTable } from '@/components';

export default function Page(): React.ReactElement {
	const [ORDERED_DATA, TABLE] = useOrganizationTable();
	return <>
		{/* WARN: passing function (i.e. not using closure) changes 'this' context */}
		<OrganizationForm id='new-location-form' onSubmit={o => ORDERED_DATA.append(o)} />
		{TABLE}
	</>;
}
