import React from 'react';
import type { Children, On } from './props-with';
import type { Order } from './table/order';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid';
import { COLUMN_STYLE } from './table/column';
import { FLEX, HOVER } from './css';
import { Snakecase, equalsIgnoreCase } from '@/utils';

export * from './table/button';
export * from './table/column';
export * from './table/contact';
export * from './table/contact/hooks';
export * from './table/department';
export * from './table/department/hooks';
export * from './table/employee';
export * from './table/employee/hooks';
export * from './table/expense';
export * from './table/expense/hooks';
export * from './table/invoice';
export * from './table/job';
export * from './table/job/hooks';
export * from './table/location';
export * from './table/location/hooks';
export * from './table/order';
export * from './table/organization';
export * from './table/organization/hooks';
export * from './table/role';
export * from './table/role/hooks';
export * from './table/row';
export * from './table/timesheet';
export * from './table/timesheet/hooks';
export * from './table/user';
export * from './table/user/hooks';

type TableProps<T extends string> = {
	headers: readonly T[],
	order: Order<Snakecase<T>>,
};

/** An action to take when the {@link Table} is reordered. */
type OnReorder<T extends string> = Required<On<'reorder', [order: TableProps<T>['order']]>>;

/** {@link COLUMN_STYLE} adapted for `<th>`. */
const HEADING_STYLE = `${COLUMN_STYLE} text-left` as const;

/** The icons which are used to indicate the sort order for a given {@link Table}. */
function SortIcons<T extends string>(props: { header: T, order: TableProps<T>['order'] }): React.ReactElement {
	const SNAKE = props.header.replaceAll(' ', '_');

	/** @returns the style for the sort icon in each header. */
	function sortIconStyle(ascending: boolean): string {
		return ((equalsIgnoreCase(SNAKE, props.order.column) && props.order.ascending === ascending)
			? 'text-table-header-button-fg-active'
			: 'text-table-header-button-fg'
		);
	}

	return (
		<span className={`${FLEX} flex-col [&>*]:w-3`}>
			<ChevronUpIcon className={sortIconStyle(true)} />
			<ChevronDownIcon className={sortIconStyle(false)} />
		</span>
	);
}

/** @returns a `<table>` with the standard winvoice appearance. */
export function Table<T extends string>(props: Children & OnReorder<T> & TableProps<T>): React.ReactElement {
	return (
		<div className={`${HOVER} border-2 [main>&]:max-w-full max-w-fit rounded-md \
border-table-border \
overflow-y-scroll bg-table-header-bg`}>
			<table className={`max-w-fit \
[&>tbody>tr:not(:nth-child(1_of_:has(td>div>table)))>td>div>table>thead]:hidden \
[&:not(:has(>tbody>tr>td:first-child_button))>thead>tr>th:first-child]:hidden
[&>tbody>tr>td:first-child:not(:has(button))]:hidden
whitespace-pre`}>
				<thead className='border-b-2 border-table-row-border'>
					<tr>
						<th className={HEADING_STYLE}>
							Actions
						</th>

						{props.headers.map(header => (
							<th className={HEADING_STYLE} key={header}>
								<button onClick={() => {
									const HEADER = header.toLowerCase().replaceAll(/[ -]/g, '_') as Snakecase<T>;
									props.onReorder({
										ascending: equalsIgnoreCase(props.order.column, HEADER) ? !props.order.ascending : false,
										column: HEADER,
									});
								}}>
									<span className={`${FLEX} justify-left gap-2`}>
										{header}
										<SortIcons header={header} order={props.order} />
									</span>
								</button>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{props.children}
				</tbody>
			</table>
		</div>
	);
}
