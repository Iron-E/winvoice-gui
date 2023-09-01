import { Column, Row, Table } from '../table';
import { type Location } from '@/schema'

export function LocationTable(props: { data: Location[] }): React.ReactElement {
	return (
		<Table headings={['Currency', 'ID', 'Name', 'Outer']}>
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
