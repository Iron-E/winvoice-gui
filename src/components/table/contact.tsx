'use client';

import React from 'react';
import type { BaseProps } from './props';
import type { Contact, Location } from '@/schema'
import type { On } from '../props-with';
import { ContactForm } from '../form';
import { Route } from '@/api';
import { Table, Td, Tr, type Valuators, useRowEventHandlers, LocationOrder, LocationTable, OrderedData } from '../table';
import { useApiContext } from '../api';

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

/** @returns a {@link Table} that displays a {@link Location} and its outer location. */
export function ContactTable(props:
	& BaseProps<Contact, 'label'>
	& Required<On<'reorderAddress' | 'reorderOuterAddress', Parameters<LocationOrder[1]>>>
	& Record<'addressOrder' | 'outerAddressorder', LocationOrder[0]>
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
			onReorder={props.orderedData.setOrder as any}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(c => (
				<Tr
					selected={c.label === props.selectedRow}
					key={c.label}
					onClick={props.onRowSelect && (() => props.onRowSelect!(c))}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: c }) : undefined}
					onEdit={() => setRowEvent({ action: 'edit', data: c })}
				>
					<Td>{c.label}</Td>
					<Td>
						{'address' in c && (
							<LocationTable
								onReorderOuter={props.onReorderOuterAddress}
								orderedData={new OrderedData(props.addressOrder, props.onReorderAddress, [c.address])}
								outerOrder={props.outerAddressorder}
							/>
						)}
					</Td>
					<Td>{(c as any).email}</Td>
					<Td>{(c as any).other}</Td>
					<Td>{(c as any).phone}</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
