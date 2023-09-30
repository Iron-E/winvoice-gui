export * from './order/data';
export * from './order/hooks';
export * from './order/valuators';

/** The order by which rows in a table are sorted. */
export type Order<T> = Readonly<{
	/** whether the order is sorted from most to least, or least to most. */
	ascending: boolean,

	/** The column which the data is sorted by. */
	column: T,
}>;
