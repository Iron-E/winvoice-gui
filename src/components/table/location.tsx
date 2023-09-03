import React from 'react';
import { Column, OrderedData, Row, Table, useOrder } from '../table';
import { type Location } from '@/schema'

/** the headers of the {@link LocationTable}. */
const HEADERS = ['Name', 'ID', 'Currency', 'Outer'] as const;

export function LocationTable(props: { orderedData: OrderedData<Location> }): React.ReactElement {
	const [OUTER_ORDER, setOuterOrder] = useOrder<keyof Location>('name');

	return (
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.order.set}
			order={props.orderedData.order.get}
		>
			{props.orderedData.data.get.map(l => (
				<Row key={l.id}>
					<Column>{l.name}</Column>
					<Column>{l.id}</Column>
					<Column>{l.currency}</Column>
					<Column>
						{l.outer && (
							<LocationTable orderedData={{
								data: { get: [l.outer], set: () => {/* do  nothing, it's only one value*/ } },
								order: { get: OUTER_ORDER, set: order => setOuterOrder(order) },
							}} />
						)}
					</Column>
				</Row>
			))}
		</Table>
	);
}
