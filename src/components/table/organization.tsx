'use client';

import React from 'react';
import type { BaseProps, OrderProps } from './props';
import type { Location, Organization } from '@/schema'
import { getId } from '@/utils';
import { LocationTable } from './location';
import { OrderedData } from './order/data';
import { OrganizationForm } from '../form';
import { Route } from '@/api';
import { Table } from '../table';
import { Td } from './column';
import { Tr, useRowEventHandlers } from './row';
import { useApiContext } from '../api';

export * from './organization/valuators';

/** the headers of the {@link OrganizationTable}. */
const HEADERS = ['ID', 'Name', 'Location'] as const;

/** @returns a table which displays {@link Organization}s in a customizable manner. */
export function OrganizationTable(props:
	& BaseProps<Organization, 'id'>
	& OrderProps<'location' | 'outerLocation', Location>
): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.Organization,
		e => `organization ${e.id} "${e.name}"`,
		getId,
		props => <OrganizationForm  {...props} id='edit-organization-form' />,
	);

	return <>
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(o => (
				<Tr
					key={o.id}
					onClick={props.onRowSelect && (() => props.onRowSelect!(o))}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: o }) : undefined}
					onEdit={() => setRowEvent({ action: 'edit', data: o })}
					selected={o.id === props.selectedRow}
				>
					<Td>{o.id}</Td>
					<Td>{o.name}</Td>
					<Td>
						<LocationTable
							deletable={false}
							onReorderOuter={props.onReorderOuterLocation}
							orderedData={new OrderedData(
								props.locationOrder,
								props.onReorderLocation,
								[o.location],
								d => props.orderedData.swap(getId, o.id, { ...o, location: d[0]! }),
							)}
							outerOrder={props.outerLocationOrder}
						/>
					</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
