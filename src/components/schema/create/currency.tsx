import type { Maybe } from '@/utils';
import type { SelectProps } from './props';
import { Currency } from '@/schema';
import { LabeledSelect } from '../../labeled';

/** All {@link Currency | Currencies} mapped to {@link React.JSX.IntrinsicElements.option | option}s  */
const OPTIONS: ReadonlyArray<React.ReactElement> = [
	(<option key='no currency'>N/a</option>),
	...Object.entries(Currency).map(([k, v]) => (
		<option key={k} value={v}>{v}</option>
	))
];

/** @return a {@link React.JSX.IntrinsicElements.select | select} to determine a given {@link Currency} */
export function SelectCurrency(props: SelectProps<Maybe<Currency>>): React.ReactElement {
	return (
		<LabeledSelect
			id={props.id}
			label={props.label ?? 'Currency'}
			// @ts-ignore: onChange can safely be accept a `Currency` param because all of the `values` are currency values
			onChange={props.onChange}
			required={props.required}
			title={props.title}
			value={props.value}
		>
			{OPTIONS}
		</LabeledSelect>
	);
}
