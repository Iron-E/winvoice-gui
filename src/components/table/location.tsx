import React from 'react';
import type { On } from '../props-with';
import { Column, OrderedData, Row, Table, useOrder } from '../table';
import { type Location } from '@/schema'

/** the headers of the {@link LocationTable}. */
const HEADERS = ['Name', 'ID', 'Currency', 'Outer'] as const;

/** @return {@link useOrder} specialized for a {@link Location}. */
export function useLocationOrder(): ReturnType<typeof useOrder<keyof Location>> {
	return useOrder<keyof Location>('name');
}

type LocationOrder = ReturnType<typeof useLocationOrder>;

export function LocationTable(
	props:
		Required<On<'reorderOuter', Parameters<LocationOrder[1]>>>
		& { outerOrder: LocationOrder[0], orderedData: OrderedData<Location> },
): React.ReactElement {
	const [OUTER_ORDER, setOuterOrder] = useLocationOrder(); // TODO: remove this, as the infinite potential recursion here will break inner table sorting

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
							<LocationTable
								onReorderOuter={setOuterOrder}
								orderedData={{
									data: { get: [l.outer] },
									order: { get: props.outerOrder, set: props.onReorderOuter },
								}}
								outerOrder={OUTER_ORDER}
							/>
						)}
					</Column>
				</Row>
			))}
		</Table>
	);
}
