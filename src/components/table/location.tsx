import React from 'react';
import { Column, Row, Table, useRowOrder } from '../table';
import { type Location } from '@/schema'

/** the headers of the {@link LocationTable}. */
const HEADERS = ['Name', 'ID', 'Currency', 'Outer'] as const;

export function LocationTable(props: { data: ReadonlyArray<Location> }): React.ReactElement {
	const [ORDER, ORDERED_DATA, setOrder] = useRowOrder('name', props.data);

	return (
		<Table
			headers={HEADERS}
			onSort={order =>  setOrder(order)}
			order={ORDER}
		>
			{ORDERED_DATA.map(l => (
				<Row key={l.id}>
					<Column>{l.name}</Column>
					<Column>{l.id}</Column>
					<Column>{l.currency}</Column>
					<Column>{l.outer && <LocationTable data={[l.outer]} />}</Column>
				</Row>
			))}
		</Table>
	);
}
