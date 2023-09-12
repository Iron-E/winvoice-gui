'use client';

import * as hooks from '@/hooks';
import React from 'react';
import type { Id, On } from '../props-with';
import { Client } from '../api';
import { ConfirmModal, Modal } from '../modal';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/20/solid';
import { FLEX, ICON } from '../css';
import { OrderedData, Table, TableButton, Td, Tr, type Valuators, useOrder, RowAction } from '../table';
import { Props } from '@/utils';
import { Route } from '@/api';
import { SHOW_MESSAGE_CONTEXT } from '../messages';
import { type Location } from '@/schema'
import { LocationForm } from '../form';

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

/** @returns {@link useOrder} specialized for a {@link Location}. */
export function useLocationOrder(): ReturnType<typeof useOrder<keyof Location>> {
	return useOrder<keyof Location>('name');
}

/** @returns a table which displays {@link Location}s in a customizable manner. */
function BaseLocationTable(props:
	& On<'rowSelect', [l: Location]>
	& {
		deletable?: boolean,
		mapOuter: (l: Location) => React.ReactElement,
		orderedData: OrderedData<Location>,
		selectedRow?: Id,
	}
): React.ReactElement {
	const CLIENT = React.useContext(Client.CONTEXT);
	const showMessage = React.useContext(SHOW_MESSAGE_CONTEXT);
	const [MODAL_VISIBLE, setModalVisible] = hooks.useModalVisibility<RowAction<Location>>();

	return <>
		<Table
			headers={HEADERS}
			onReorder={props.orderedData.setOrder}
			order={props.orderedData.order}
		>
			{props.orderedData.data.map(l => (
				<Tr
					key={l.id}
					onClick={props.onRowSelect && (() => props.onRowSelect!(l))}
					onDelete={props.deletable === true ? () => setModalVisible({ action: 'delete', data: l }) : undefined}
					// ?
					onEdit={() => setModalVisible({ action: 'edit', data: l })}
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

		{MODAL_VISIBLE != undefined && (MODAL_VISIBLE.action === 'delete'
			? <ConfirmModal
				onClose={setModalVisible}
				onConfirm={async () => await props.orderedData.delete(
					CLIENT,
					showMessage,
					Route.Location,
					[MODAL_VISIBLE.data],
				)}
				message={<>
					the location {MODAL_VISIBLE.data.id} "{MODAL_VISIBLE.data.name}" should be <b>permanently</b> deleted
				</>}
			/>
			: <Modal onClose={setModalVisible}>
				<LocationForm
					id='edit-location-form'
					initialValues={MODAL_VISIBLE.data}
					onSubmit={async l => {
						await props.orderedData.edit(CLIENT, showMessage, Route.Location, { [l.id]: l }, l => l.id);
						setModalVisible(null);
					}}
				/>
			</Modal>
		)}
	</>;
}

type LocationOrder = ReturnType<typeof useLocationOrder>;

/** @returns a {@link Table} that displays a {@link Location} and its outer location. */
export function LocationTable(props:
	& Pick<Props<typeof BaseLocationTable>, 'onRowSelect'>
	& Required<On<'reorderOuter', Parameters<LocationOrder[1]>>>
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
	const [MODAL_VISIBLE, setModalVisible] = hooks.useModalVisibility<Location>();

	return <>
		<BaseLocationTable
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
