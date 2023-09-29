'use client';

import React from 'react';
import type { BaseProps, OrderProps } from './props';
import type { Contact, Location } from '@/schema'
import type { ValueOf } from '@/utils';
import { ContactForm } from '../form';
import { LocationTable, OrderedData, Table, Td, Tr, type Valuators, useRowEventHandlers } from '../table';
import { Route } from '@/api';
import { useApiContext } from '../api';

/** the headers of the {@link ContactTable}. */
const HEADERS = ['Label', 'Email', 'Other', 'Phone', 'Address'] as const;

/**
 * @param c the contact to get the label of.
 * @returns the label of the contact.
 */
function label(c: Contact): ValueOf<Contact, 'label'> {
	return c.label;
}

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Location}
 */
export function contactValuators(
	addressKey: keyof Location,
	outerAddressKey: keyof ValueOf<Location, 'outer'>,
): Valuators<Contact> {
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
	& OrderProps<'address' | 'outerAddress', Location>
): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.Contact,
		c => `contact "${c.label}"`,
		label,
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
					key={c.label}
					onClick={props.onRowSelect && (() => props.onRowSelect!(c))}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: c }) : undefined}
					onEdit={() => setRowEvent({ action: 'edit', data: c })}
					selected={c.label === props.selectedRow}
				>
					<Td>{c.label}</Td>
					<Td>{'email' in c && c.email}</Td>
					<Td>{'other' in c && c.other}</Td>
					<Td>{'phone' in c && c.phone}</Td>
					<Td>
						{'address' in c && (
							<LocationTable
								deletable={false}
								onReorderOuter={props.onReorderOuterAddress}
								orderedData={new OrderedData(
									props.addressOrder,
									props.onReorderAddress,
									[c.address],
									d => props.orderedData.swap(label, c.label, { ...c, address: d[0]! }),
								)}
								outerOrder={props.outerAddressOrder}
							/>
						)}
					</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}
