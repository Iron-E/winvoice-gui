import React from 'react';
import { Column, Row, RowOrder, Table } from '../table';
import { type Location } from '@/schema'

const HEADERS = ['Currency', 'ID', 'Name', 'Outer'] as const;

export function LocationTable(props: { data: Location[] }): React.ReactElement {
	const [ORDER, setOrder] = React.useState<RowOrder<typeof HEADERS[number]>>({ header: 'Name', ascending: false });

	return (
		<Table
			headers={HEADERS}
			onSort={order => {
				setOrder(order);
			}}
			order={ORDER}
		>
			{props.data.map(l => (
				<Row key={l.id}>
					<Column>{l.currency}</Column>
					<Column>{l.id}</Column>
					<Column>{l.name}</Column>
					<Column>{l.outer && <LocationTable data={[l.outer]} />}</Column>
				</Row>
			))}
		</Table>
	);
}
