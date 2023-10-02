import React from 'react';
import type { BaseProps, OrderProps } from './props';
import { moneyToString, type Invoice, type InvoiceDate } from '@/schema'
import { OrderedData, Table, Td, Tr } from '../table';

export * from './invoice/hooks';
export * from './invoice/valuators';

/** the headers of the {@link InvoiceTable}. */
const INVOICE_HEADERS = ['Date', 'Hourly Rate'] as const;

/** the headers of the {@link InvoiceTable}. */
const INVOICE_DATE_HEADERS = ['Issued', 'Paid'] as const;

/** @returns a table which displays {@link Invoice}s in a customizable manner. */
export function InvoiceDateTable(props:
	& Omit<BaseProps<InvoiceDate, 'issued'>, 'deletable' | 'selectedRow'>
): React.ReactElement {
	return (
		<Table
			headers={INVOICE_DATE_HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map((d, i) => {
				return (
					<Tr key={i} onClick={props.onRowSelect && (() => props.onRowSelect!(d))}>
						<Td>{d.issued.toLocaleString()}</Td>
						<Td>{d.paid?.toLocaleString()}</Td>
					</Tr>
				);
			})}
		</Table>
	);
}

/** @returns a table which displays {@link Invoice}s in a customizable manner. */
export function InvoiceTable(props:
	& Omit<BaseProps<Invoice, 'hourly_rate'>, 'deletable' | 'selectedRow'>
	& OrderProps<'date', InvoiceDate>
): React.ReactElement {
	return (
		<Table
			headers={INVOICE_HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map((i, index) => {
				return (
					<Tr key={index} onClick={props.onRowSelect && (() => props.onRowSelect!(i))}>
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
