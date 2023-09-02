import { ChevronDownIcon, ChevronUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { FLEX, HOVER, ICON, PAD } from './css';
import type { Children, Click, On } from './props-with';
import React from 'react';
import { equalsIgnoreCase } from '@/utils';

export * from './table/location';

/** The order by which rows are sorted. */
export type RowOrder<T> = { header: T, ascending: boolean };

const COL_STYLE = `${PAD} [&:not(:last-child)]:border-r-[1px] border-table-col-border` as const;

/** @return a `<button>` with the standard winvoice appearance. */
function Button(props: Children & Click): React.ReactElement {
	return (
		<button
			className={`${PAD} ${HOVER} bg-table-button-bg hover:bg-table-button-bg-hover`}
			onClick={props.onClick && (e => {
				e.preventDefault();
				// @ts-ignore
				props.onClick(e)
			})}
		>
			{props.children}
		</button>
	);
}

/** @return a `<td>` with the standard winvoice appearance. */
export function Column(props: Children): React.ReactElement {
	return (
		<td className={COL_STYLE}>
			{props.children}
		</td>
	);
}

/** @return a `<tr>` with the standard winvoice appearance. */
export function Row(props: Children & Click & On<'delete'> & On<'edit'>): React.ReactElement {
	return (
		<tr
			className={`${HOVER} [&:not(:last-child)]:border-b-[1px] \
odd:bg-table-row-bg-odd even:bg-table-row-bg-even border-table-row-border`}
			onClick={props.onClick}
		>
			{props.children}

			<Column>
				<span className={`${FLEX} justify-between gap-2`}>
					<Button onClick={props.onDelete}>
						<TrashIcon className={ICON} /> Delete
					</Button>

					<Button onClick={props.onEdit}>
						<PencilIcon className={ICON} /> Edit
					</Button>
				</span>
			</Column>
		</tr>
	);
}

/**
 * A hook that memoizes the ordering of the `data`.
 * @param defaultHeader the header which is used to sort the rows by default.
 * @param data the rows to sort.
 * @return the {@link RowOrder | order} of the data, the ordered data, and a {@Link React.Dispatch | dispatch action} to set the order of the data.
 */
export function useRowOrder<T>(
	defaultHeader: keyof T,
	data: ReadonlyArray<T>,
): [Readonly<RowOrder<keyof T>>, ReadonlyArray<T>, React.Dispatch<React.SetStateAction<RowOrder<keyof T>>>] {
	const [ORDER, setOrder] = React.useState<RowOrder<keyof T>>({ header: defaultHeader, ascending: false });
	const ORDERED_DATA = React.useMemo(() => [...data].sort((d1, d2) => {
		if (d1[ORDER.header] < d2[ORDER.header]) {
			var value = -1;
		} else if (d1[ORDER.header] > d2[ORDER.header]) {
			var value = 1;
		} else {
			var value = 0;
		}

		return ORDER.ascending ? value * -1 : value;
	}), [ORDER, data]);

	return [ORDER, ORDERED_DATA, setOrder];
}

/** @return a `<table>` with the standard winvoice appearance. */
export function Table<T extends string>(
	props:
		Children
		& On<'sort', [order: Readonly<RowOrder<Lowercase<T>>>]>
		& { headers: ReadonlyArray<T>, order: Readonly<RowOrder<Lowercase<T>>> },
): React.ReactElement {
	/** @return the style for the sort icon in each header. */
	function sortIconStyle(header: T, ascending: boolean): string {
		return ((equalsIgnoreCase(props.order.header, header) && props.order.ascending === ascending)
			? 'text-table-header-button-fg-active'
			: 'text-table-header-button-fg'
		);
	}

	return (
		<div className={`${HOVER} border-2 [main>&]:max-w-full max-w-fit rounded-md \
border-table-border \
overflow-y-scroll bg-table-header-bg`}>
			<table className='max-w-fit'>
				<thead className='border-b-2 border-table-row-border'>
					<tr>
						{props.headers.map(header => (
							<th className={`${COL_STYLE} text-left whitespace-nowrap`} key={header}>
								<button onClick={() => {
									const HEADER = header.toLowerCase() as Lowercase<T>;
									props.onSort?.({
										ascending: equalsIgnoreCase(props.order.header, HEADER) ? !props.order.ascending : false,
										header: HEADER,
									});
								}}>
									<span className={`${FLEX} justify-left gap-2`}>
										{header}
										<span className={`${FLEX} flex-col [&>*]:w-3`}>
											<ChevronUpIcon className={sortIconStyle(header, true)} />
											<ChevronDownIcon className={sortIconStyle(header, false)} />
										</span>
									</span>
								</button>
							</th>
						))}
						<th>{/* delete/edit */}</th>
					</tr>
				</thead>
				<tbody>
					{props.children}
				</tbody>
			</table>
		</div>
	);
}
