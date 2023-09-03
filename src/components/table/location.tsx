import React from 'react';
import { Column, OnReorder, OrderedData, Row, Table, useOrder } from '../table';
import { type Location } from '@/schema'

/** the headers of the {@link LocationTable}. */
const HEADERS = ['Name', 'ID', 'Currency', 'Outer'] as const;

export function LocationTable(props: OnReorder<keyof Location> & { orderedData: OrderedData<Location> }): React.ReactElement {
	const [OUTER_ORDER, setOuterOrder] = useOrder<keyof Location>('name');

	return (
		<Table
			headers={HEADERS}
			onReorder={props.onReorder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(l => (
				<Row key={l.id}>
					<Column>{l.name}</Column>
					<Column>{l.id}</Column>
					<Column>{l.currency}</Column>
					<Column>
						{l.outer && (
							<LocationTable onReorder={setOuterOrder} orderedData={{ data: [l.outer], order: OUTER_ORDER }} />
						)}
					</Column>
				</Row>
			))}
		</Table>
	);
}
