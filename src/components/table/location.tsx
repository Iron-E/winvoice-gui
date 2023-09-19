'use client';

import * as hooks from '@/hooks';
import React from 'react';
import type { BaseProps } from './props';
import type { Location } from '@/schema'
import type { On } from '../props-with';
import type { Props } from '@/utils';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/20/solid';
import { FLEX, ICON } from '../css';
import { LocationForm } from '../form';
import { Modal } from '../modal';
import { OrderedData, Table, TableButton, Td, Tr, type Valuators, useOrder, useRowEventHandlers } from '../table';
import { Route } from '@/api';
import { useApiContext } from '../api';

/** the headers of the {@link LocationTable}. */
const HEADERS = ['Name', 'ID', 'Currency', 'Outer'] as const;

/**
 * @param outerOrder the
 * @returns {@link Valuators} for a {@link Location}
 */
export function locationValuators(outerKey: keyof Location): Valuators<Location> {
	return {
		outer: {
			key: outerKey,
			valuators: { outer: { key: 'name' } },
		}
	};
}

/** The {@link Order} of {@link Location}s. */
export type LocationOrder = ReturnType<typeof useOrder<keyof Location>>;

/** @returns {@link useOrder} specialized for a {@link Location}. */
export function useLocationOrder(): LocationOrder {
	return useOrder<keyof Location>('name');
}

/** @returns a table which displays {@link Location}s in a customizable manner. */
function BaseLocationTable(props:
	& BaseProps<Location, 'id'>
	& { mapOuter: (l: Location) => React.ReactElement }
): React.ReactElement {
	const [CLIENT, showMessage] = useApiContext();
	const [HANDLER, setRowEvent] = useRowEventHandlers(
		props.orderedData, CLIENT, showMessage, Route.Location,
		l => `location ${l.id} "${l.name}"`,
		l => l.id,
		(props) => <LocationForm  {...props} id='edit-location-form' />,
	);

	return <>
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(l => (
				<Tr
					selected={l.id === props.selectedRow}
					key={l.id}
					onClick={props.onRowSelect && (() => props.onRowSelect!(l))}
					onDelete={props.deletable !== false ? () => setRowEvent({ action: 'delete', data: l }) : undefined}
					// ?
					onEdit={() => setRowEvent({ action: 'edit', data: l })}
				>
					<Td>{l.name}</Td>
					<Td>{l.id}</Td>
					<Td>{l.currency}</Td>
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
	& Required<On<'reorderOuter', Parameters<LocationOrder[1]>>>
	& { outerOrder: LocationOrder[0] },
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
						d => props.orderedData.map(v =>  v.outer === o ? { ...v, outer: d[0] } : v),
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
