'use client';

import React from 'react';
import type { BaseProps, OrderProps } from './props';
import { InvoiceDateTable } from './invoice/invoice-date';
import { invoiceToString, type Invoice, type InvoiceDate, moneyToString } from '@/schema'
import { Table, Td, Tr, type UseOrder, type Valuators, useOrder, OrderedData } from '../table';

/** the headers of the {@link InvoiceTable}. */
const HEADERS = ['Date', 'Hourly Rate'] as const;

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Invoice}
 */
export function invoiceValuators(dateKey: keyof InvoiceDate): Valuators<Invoice> {
	return {
		date: { key: dateKey },
		hourly_rate: { key: 'amount' },
	};
}

/** @returns {@link useOrder} specialized for a {@link Invoice}. */
export function useInvoiceOrder(): UseOrder<Invoice> {
	return useOrder('date');
}

/** @returns a table which displays {@link Invoice}s in a customizable manner. */
export function InvoiceTable(props:
	& Omit<BaseProps<Invoice, 'hourly_rate'>, 'deletable' | 'selectedRow'>
	& OrderProps<'date', InvoiceDate>
): React.ReactElement {
	return (
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(i => {
				// NOTE: although two independant invoices might reasonably produce the same output here, it is safe because
				//       invoices are never stored in an array. They are only displayed alongside a `Job`, which *does* have
				//       a unique ID.
				const STR = invoiceToString(i);
				return (
					<Tr key={STR} onClick={props.onRowSelect && (() => props.onRowSelect!(i))}>
						<Td>
							{i.date && (
								<InvoiceDateTable
									orderedData={new OrderedData(
										props.dateOrder,
										props.onReorderDate,
										[i.date],
										d => props.orderedData.swap(() => true, true, { ...i, date: d[0] }),
									)}
								/>
							)}
						</Td>
						<Td>{moneyToString(i.hourly_rate)}</Td>
					</Tr>
				);
			})}
		</Table>
	);
}
