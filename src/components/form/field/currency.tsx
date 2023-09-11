import type { Maybe } from '@/utils';
import type { SelectProps } from './props';
import { Currency } from '@/schema';
import { Select } from '../../form';

/** All {@link Currency | Currencies} mapped to {@link React.JSX.IntrinsicElements.option | option}s  */
const OPTIONS: readonly React.ReactElement[] = [
	(<option key='no currency'>N/a</option>),
	...Object.entries(Currency).map(([k, v]) => (
		<option key={k} value={v}>{v}</option>
	))
];

/** @return a {@link React.JSX.IntrinsicElements.select | select} to determine a given {@link Currency} */
export function SelectCurrency(props: Omit<SelectProps<Maybe<Currency>>, 'children'>): React.ReactElement {
	return (
		<Select
			id={props.id}
			label={props.label ?? 'Currency'}
			onChange={props.onChange as (currency: string) => void} // NOTE: safe upcast, the `OPTIONS` are all Currencies
			required={props.required}
			title={props.title}
			value={props.value}
		>
			{OPTIONS}
		</Select>
	);
}
