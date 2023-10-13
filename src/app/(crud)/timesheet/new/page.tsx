'use client';

import React from 'react';
import { TimesheetForm, useTimesheetTable } from '@/components';

export default function Page(): React.ReactElement {
	const [ORDERED_DATA, TABLE] = useTimesheetTable();
	return <>
		{/* WARN: passing function (i.e. not using closure) changes 'this' context */}
		<TimesheetForm id='new-timesheet-form' onSubmit={t => ORDERED_DATA.append(t)} />
		{TABLE}
	</>;
}
