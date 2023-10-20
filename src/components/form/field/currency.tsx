import type { Maybe } from '@/utils';
import type { SelectProps } from './props';
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';
import { Currency } from '@/schema';
import { FLEX, ICON } from '@/components/css';
import { Select } from '../field';
import { TABLE_BUTTON_STYLE } from '@/components/table/button';

/** All {@link Currency | Currencies} mapped to {@link React.JSX.IntrinsicElements.option | option}s  */
const BASE_OPTIONS: readonly React.ReactElement[] = Object.entries(Currency).map(([k, v]) => (
	<option key={k} value={v}>{v}</option>
));

/** All {@link Currency | Currencies} mapped to {@link React.JSX.IntrinsicElements.option | option}s  */
const EXPORT_OPTIONS: readonly React.ReactElement[] = [
	<option key='' value=''>Export</option>,
	<option key='default' value='default'>Default</option>,
	...BASE_OPTIONS,
].reverse();

/** All {@link Currency | Currencies} mapped to {@link React.JSX.IntrinsicElements.option | option}s  */
const SELECT_OPTIONS: readonly React.ReactElement[] = [
	<option key='no currency' value=''>N/a</option>,
	...BASE_OPTIONS
];

/** @returns a {@link React.JSX.IntrinsicElements.select | select} to determine a given {@link Currency} */
export function SelectCurrency(props: SelectProps<Maybe<Currency>>): React.ReactElement {
	return (
		<Select
			id={props.id}
			label={props.label ?? 'Currency'}
			onChange={currency => props.onChange!(currency === '' ? undefined : currency as Currency)}
			required={props.required}
			title={props.title}
			value={props.value}
		>
			{SELECT_OPTIONS}
		</Select>
	);
}

/** @returns a {@link React.JSX.IntrinsicElements.select | select} to determine a given {@link Currency} */
export function SelectExportCurrency(props: Pick<SelectProps<Maybe<Currency>>, 'onChange'>): React.ReactElement {
	return (
		<div className={TABLE_BUTTON_STYLE}>
			<ArrowDownTrayIcon className={ICON} />
			&nbsp;{/* NOTE: "it's not good to use spaces as padding!" but all the other icons *organically* do, so */}
			<select
				className='appearance-none bg-inherit'
				onChange={e => {
					const VALUE = e.target.value;
					props.onChange!(VALUE === '' || VALUE === 'default' ? undefined : VALUE as Currency);
				}}
				title='Select the currency being exported to'
				placeholder='Export'
				value=''
			>
				{EXPORT_OPTIONS}
			</select>
		</div>
	);
}
