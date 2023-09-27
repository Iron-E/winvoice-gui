import type { Maybe } from '@/utils';
import type { SelectProps } from './props';
import { Currency } from '@/schema';
import { Select } from '../field';

/** All {@link Currency | Currencies} mapped to {@link React.JSX.IntrinsicElements.option | option}s  */
const OPTIONS: readonly React.ReactElement[] = [
	(<option key='no currency' value=''>N/a</option>),
	...Object.entries(Currency).map(([k, v]) => (
		<option key={k} value={v}>{v}</option>
	))
];

/** @returns a {@link React.JSX.IntrinsicElements.select | select} to determine a given {@link Currency} */
export function SelectCurrency(props: SelectProps<Maybe<Currency>>): React.ReactElement {
	return (
		<Select
			id={props.id}
			label={props.label ?? 'Currency'}
			onChange={props.onChange && (currency => props.onChange!(
				currency === '' ? undefined : currency as Currency,
			))}
			required={props.required}
			title={props.title}
			value={props.value}
		>
			{OPTIONS}
		</Select>
	);
}
