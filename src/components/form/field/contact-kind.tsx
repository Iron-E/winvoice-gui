import type { SelectProps } from './props';
import type { ContactKind, ContactKinds } from '@/schema';
import { Select } from '../field';

/** All {@link ContactKind | Currencies} mapped to {@link React.JSX.IntrinsicElements.option | option}s  */
const OPTIONS: readonly React.ReactElement[] = [
	<option key='email' value={'email' as ContactKinds}>Email Address</option>,
	<option key='address' value={'address' as ContactKinds}>Physical Address</option>,
	<option key='phone' value={'phone' as ContactKinds}>Phone Number</option>,
	<option key='other' value={'other' as ContactKinds}>Other</option>,
];

/** @returns a {@link React.JSX.IntrinsicElements.select | select} to determine a given {@link ContactKind} */
export function SelectContactKind(props: SelectProps<ContactKinds>): React.ReactElement {
	return (
		<Select
			id={props.id}
			label={props.label ?? 'Contact kind'}
			onChange={props.onChange as (currency: string) => void} // NOTE: safe upcast, the `OPTIONS` are all Kinds
			required={props.required}
			title={props.title}
			validateIconRight={props.validateIconRight}
			validateIconTop={props.validateIconTop}
			value={props.value}
		>
			{OPTIONS}
		</Select>
	);
}
