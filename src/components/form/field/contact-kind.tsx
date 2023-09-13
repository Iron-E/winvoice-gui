import type { UnionKeys } from '@/utils';
import type { SelectProps } from './props';
import type { ContactKind } from '@/schema';
import { Select } from '../field';

type Kinds = UnionKeys<ContactKind>;

/** All {@link ContactKind | Currencies} mapped to {@link React.JSX.IntrinsicElements.option | option}s  */
const OPTIONS: readonly React.ReactElement[] = [
	<option value={'email' as Kinds}>Email Address</option>,
	<option value={'address' as Kinds}>Physical Address</option>,
	<option value={'phone' as Kinds}>Phone Number</option>,
	<option value={'other' as Kinds}>Other</option>,
];

/** @returns a {@link React.JSX.IntrinsicElements.select | select} to determine a given {@link ContactKind} */
export function SelectContactKind(props: Omit<SelectProps<Kinds>, 'children'>): React.ReactElement {
	return (
		<Select
			id={props.id}
			label={props.label ?? 'Contact kind'}
			onChange={props.onChange as (currency: string) => void} // NOTE: safe upcast, the `OPTIONS` are all Kinds
			required={props.required}
			title={props.title}
			value={props.value}
		>
			{OPTIONS}
		</Select>
	);
}
