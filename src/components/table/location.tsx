'use client';

import * as hooks from '@/hooks';
import React from 'react';
import type { BaseProps, OrderProps } from './props';
import type { Location } from '@/schema'
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/20/solid';
import { FLEX, ICON } from '../css';
import { getId, type Props } from '@/utils';
import { LocationForm } from '../form';
import { Modal } from '../modal';
import { OrderedData } from './order';
import { Route } from '@/api';
import { Table } from '../table';
import { TableButton } from './button';
import { Td } from './column';
import { Tr, useRowEventHandlers } from './row';
import { useApiContext } from '../api';
import { useLocationOrder } from './location/hooks/order';

export * from './location/valuators';

/** the headers of the {@link LocationTable}. */
const HEADERS = ['ID', 'Currency', 'Name', 'Outer'] as const;

/** @returns a table which displays {@link Location}s in a customizable manner. */
function BaseLocationTable(props: BaseProps<Location, 'id'> & {
	mapOuter: (l: Location) => React.ReactElement,
}): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.Location,
		l => `location ${l.id} "${l.name}"`,
		getId,
		props => <LocationForm  {...props} id='edit-location-form' />,
	);

	return <>
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(l => (
				<Tr
					key={l.id}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: l }) : undefined}
					onEdit={() => setRowEvent({ action: 'edit', data: l })}
					onSelect={props.onRowSelect && (() => props.onRowSelect!(l))}
				>
					<Td>{l.id}</Td>
					<Td>{l.currency}</Td>
					<Td>{l.name}</Td>
					<Td>
						{l.outer != undefined && props.mapOuter(l.outer)}
					</Td>
				</Tr>
			))}
		</Table>

		{HANDLER}
	</>;
}

/** @returns a {@link Table} that displays a {@link Location} and its outer location. */
export function LocationTable(props:
	& Omit<Props<typeof BaseLocationTable>, 'mapOuter'>
	& OrderProps<'outer', Location>
): React.ReactElement {
	return (
		<BaseLocationTable
			deletable={props.deletable}
			onRowSelect={props.onRowSelect}
			orderedData={props.orderedData}
			mapOuter={o => (
				<OuterLocationTable
					orderedData={new OrderedData(
						props.outerOrder,
						props.onReorderOuter,
						[o],
						d => props.orderedData.swap(v => v.outer?.id, o.id, { ...o, outer: d[0] }),
					)}
				/>
			)}
			selectedRow={props.selectedRow}
		/>
	);
}

/**
 * @returns all of the locations that are outside of and including this one, without abbreviation (unlike {@link LocationTable} and {@link OuterLocationTable}.
 */
function ShowAllLocations(props: { current: Location }): React.ReactElement {
	const [ORDER, setOrder] = useLocationOrder();
	return (
		<BaseLocationTable
			orderedData={new OrderedData(ORDER, setOrder, [props.current])}
			mapOuter={o => <ShowAllLocations current={o} />}
		/>
	);
}

/**
 * @returns a {@link BaseLocationTable} which will abbreviate further outer locations, but allow showing them on a button press.
 */
function OuterLocationTable(props: { orderedData: OrderedData<Location> }): React.ReactElement {
	const [MODAL_VISIBLE, setModalVisible] = hooks.useModalVisibility<Location>();

	return <>
		<BaseLocationTable
			deletable={false}
			orderedData={props.orderedData}
			mapOuter={o => (
				<span className={`${FLEX} justify-between gap-2`}>
					{o.name}
					<TableButton onClick={() => setModalVisible(o)}>
						<EllipsisHorizontalCircleIcon className={ICON} /> Show more
					</TableButton>
				</span>
			)}
		/>

		{MODAL_VISIBLE && (
			<Modal onClose={setModalVisible}>
				<ShowAllLocations current={MODAL_VISIBLE} />
			</Modal>
		)}
	</>;
}
