'use client';

import React from 'react';
import type { BaseProps } from './props';
import type { Location, Organization } from '@/schema'
import type { On } from '../props-with';
import { LocationOrder, LocationTable, OrderedData, Table, Td, Tr, type Valuators, useOrder, useRowEventHandlers } from '../table';
import { OrganizationForm } from '../form';
import { Route } from '@/api';
import { getId } from '@/utils';
import { useApiContext } from '../api';

/** the headers of the {@link OrganizationTable}. */
const HEADERS = ['ID', 'Name', 'Location'] as const;

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Organization}
 */
export function organizationValuators(locationKey: keyof Location, outerLocationKey: keyof Location): Valuators<Organization> {
	return {
		location: {
			key: locationKey,
			valuators: { outer: { key: outerLocationKey } },
		},
	};
}

/** The {@link Order} of {@link Organization}s. */
export type OrganizationOrder = ReturnType<typeof useOrder<keyof Organization>>;

/** @returns {@link useOrder} specialized for a {@link Organization}. */
export function useOrganizationOrder(): OrganizationOrder {
	return useOrder<keyof Organization>('name');
}

/** @returns a table which displays {@link Organization}s in a customizable manner. */
export function OrganizationTable(props:
	& BaseProps<Organization, 'id'>
	& Required<On<'reorderLocation' | 'reorderOuterLocation', Parameters<LocationOrder[1]>>>
	& Record<'locationOrder' | 'outerLocationOrder', LocationOrder[0]>
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