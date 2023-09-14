'use client';

import React from 'react';
import type { BaseProps } from './props';
import type { Contact, Location } from '@/schema'
import type { On } from '../props-with';
import { ContactForm } from '../form';
import { Route } from '@/api';
import { Table, Td, Tr, type Valuators, useOrder, useRowEventHandlers, LocationOrder } from '../table';
import { useApiContext } from '../api';
import { UnionToKeys } from '@/utils';

/** the headers of the {@link ContactTable}. */
const HEADERS = ['Label', 'Address', 'Email', 'Other', 'Phone'] as const;

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Location}
 */
export function contactValuators(addressKey: keyof Location, outerAddressKey: keyof Location): Valuators<Contact> {
	return {
		address: {
			key: addressKey,
			valuators: {
				outer: {
					key: outerAddressKey,
					valuators: { outer: { key: 'name' } },
				}
			}
		}
	};
}

/** @returns {@link useOrder} specialized for a {@link Location}. */
export function useContactOrder(): ReturnType<typeof useOrder<keyof Contact>> {
	return useOrder<keyof Contact>('label');
}

/** @returns a {@link Table} that displays a {@link Location} and its outer location. */
export function ContactTable(props:
	& BaseProps<Contact, 'label'>
	& Required<On<'reorderAddress' | 'reorderOuterAddress', Parameters<LocationOrder[1]>>>
	& UnionToKeys<'addressOrder' | 'outerAddressorder', LocationOrder[0]>
): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.Location,
		c => `contact "${c.label}"`,
		c => c.label,
		(props) => <ContactForm  {...props} id='edit-location-form' />,
	);

	return <>
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(l => (
				<Tr
					selected={l.id === props.selectedRow}
					key={l.id}
					onClick={props.onRowSelect && (() => props.onRowSelect!(l))}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: l }) : undefined}
					// ?
					onEdit={() => setRowEvent({ action: 'edit', data: l })}
				>
					<Td>{l.name}</Td>
					<Td>{l.id}</Td>
					<Td>{l.currency}</Td>
					<Td>
						{l.outer != undefined && props.mapOuter(l.outer)}
					</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
