'use client';

import React from 'react';
import type { BaseProps, OrderProps } from './props';
import type { Contact, Location } from '@/schema'
import type { ValueOf } from '@/utils';
import { ContactForm } from '../form';
import { LocationTable } from './location';
import { OrderedData } from './order';
import { Route } from '@/api';
import { Table } from '../table';
import { Td } from './column';
import { Tr, type RowEventHandlerEditForm, useRowEventHandlers } from './row';
import { useApiContext } from '../api';

export * from './contact/valuators';

const FORM: RowEventHandlerEditForm<Contact> = props => <ContactForm  {...props} id='edit-location-form' />;
const HEADERS = ['Label', 'Email', 'Other', 'Phone', 'Address'] as const;

/**
 * @param c the contact to get the label of.
 * @returns the label of the contact.
 */
function label(c: Contact): ValueOf<Contact, 'label'> {
	return c.label;
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
		FORM,
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
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: c }) : undefined}
					onEdit={() => setRowEvent({ action: 'edit', data: c })}
					onSelect={props.onRowSelect && (() => props.onRowSelect!(c))}
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
