'use client';

import React from 'react';
import { ContactForm, useContactTable } from '@/components';

export default function Page(): React.ReactElement {
	const [ORDERED_DATA, TABLE] = useContactTable();
	return <>
		{/* WARN: passing function (i.e. not using closure) changes 'this' context */}
		<ContactForm id='new-department-form' onSubmit={c => ORDERED_DATA.append(c)} />
		{TABLE}
	</>;
}
