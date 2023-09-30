'use client';

import React from 'react';
import type { BaseProps } from '../props';
import type { InvoiceDate } from '@/schema'
import {
	Table,
	Td,
	Tr,
	type UseOrder,
	useOrder,
} from '../../table';

/** the headers of the {@link InvoiceTable}. */
const HEADERS = ['Issued', 'Paid'] as const;

/** @returns {@link useOrder} specialized for a {@link Invoice}. */
export function useInvoiceDateOrder(): UseOrder<InvoiceDate> {
	return useOrder('issued');
}

/** @returns a table which displays {@link Invoice}s in a customizable manner. */
export function InvoiceDateTable(props:
	& Omit<BaseProps<InvoiceDate, 'issued'>, 'deletable' | 'selectedRow'>
): React.ReactElement {
	return (
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(d => {
				// NOTE: although two independant invoice dates might reasonably produce the same output here, it is safe because
				//       invoices are never stored in an array. They are only displayed alongside a `Job`, which *does* have
				//       a unique ID.
				const ISSUED = d.issued.toLocaleString();
				return (
					<Tr key={ISSUED} onClick={props.onRowSelect && (() => props.onRowSelect!(d))}>
						<Td>{ISSUED}</Td>
						<Td>{d.paid?.toLocaleString()}</Td>
					</Tr>
				);
			})}
		</Table>
	);
}
