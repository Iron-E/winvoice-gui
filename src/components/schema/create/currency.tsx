import type { On } from '../../props-with';
import type { Props, Spread } from '@/utils';
import { Currency } from '@/schema';
import { LabeledSelect } from '../../labeled';

type SelectProps = Omit<Props<typeof LabeledSelect>, 'children' | 'onChange'>;

/** All {@link Currency | Currencies} mapped to {@link React.JSX.IntrinsicElements.option | option}s  */
const OPTIONS = Object.entries(Currency).map(([k, v]) => (
	<option key={k} value={v}>{v}</option>
));

/** @return a {@link React.JSX.IntrinsicElements.select | select} to determine a given {@link Currency} */
export function SelectCurrency(
	props: Spread<SelectProps,
		Pick<Partial<SelectProps>, 'label'>
		& On<'change', [c: Currency]>
	>,
): React.ReactElement {
	return (
		<LabeledSelect
			id={props.id}
			label={props.label ?? 'Currency'}
			labelClassName={props.labelClassName}
			// @ts-ignore: onChange can safely be accept a `Currency` param because all of the `values` are currency values
			onChange={props.onChange}
			required={props.required}
			selectClassName={props.selectClassName}
			value={props.value}
		>
			{OPTIONS}
		</LabeledSelect>
	);
}
