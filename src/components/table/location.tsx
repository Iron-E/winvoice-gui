'use client';

import * as hooks from '@/hooks';
import React from 'react';
import type { On } from '../props-with';
import { Client } from '../api';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/20/solid';
import { FLEX, ICON } from '../css';
import { Modal } from '../modal';
import { OrderedData, Table, TableButton, Td, Tr, type Valuators, useOrder } from '../table';
import { SHOW_MESSAGE_CONTEXT } from '../messages';
import { type Location } from '@/schema'
import { Route } from '@/api';

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

/** @return {@link useOrder} specialized for a {@link Location}. */
export function useLocationOrder(): ReturnType<typeof useOrder<keyof Location>> {
	return useOrder<keyof Location>('name');
}

/** @returns a table which displays {@link Location}s in a customizable manner. */
function BaseLocationTable(props: {
	deletable?: boolean,
	mapOuter: (l: Location) => React.ReactElement,
	orderedData: OrderedData<Location>,
}): React.ReactElement {
	const CLIENT = React.useContext(Client.CONTEXT);
	const showMessage = React.useContext(SHOW_MESSAGE_CONTEXT);

	return (
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(l => (
				<Tr
					key={l.id}
					onClick={() => { throw new Error('Unimplemented: select row') }}
					onDelete={props.deletable === true
						? async () => await props.orderedData.delete(CLIENT, showMessage, Route.Location, [l])
						: undefined
					}
					onEdit={() => { throw new Error('Unimplemented: edit') }}
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
	);
}

type LocationOrder = ReturnType<typeof useLocationOrder>;

/** @returns a {@link Table} that displays a {@link Location} and its outer location. */
export function LocationTable(
	props:
		Required<On<'reorderOuter', Parameters<LocationOrder[1]>>>
		& { outerOrder: LocationOrder[0], orderedData: OrderedData<Location> },
): React.ReactElement {
	return (
		<BaseLocationTable
			deletable={true}
			orderedData={props.orderedData}
			mapOuter={o => (
				<OuterLocationTable
					orderedData={new OrderedData(props.outerOrder, props.onReorderOuter, [o])}
				/>
			)}
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
	const [MODAL_VISIBLE, setModalVisible] = hooks.useModalVisibility<string>();

	return (
		<BaseLocationTable
			orderedData={props.orderedData}
			mapOuter={o => (
				<span className={`${FLEX} justify-between gap-2`}>
					{o.name}
					<TableButton onClick={() => setModalVisible(o.id)}>
						<EllipsisHorizontalCircleIcon className={ICON} /> Show more
					</TableButton>


					{MODAL_VISIBLE === o.id && (
						<Modal onClose={() => setModalVisible(null)}>
							<ShowAllLocations current={o} />
						</Modal>
					)}
				</span>
			)}
		/>
	);
}
