import type { InputProps } from './props';
import { Input } from '../../form';

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `string`. */
export function InputString(props: Omit<InputProps<string>, 'children'>): React.ReactElement {
	return (
		<Input
			id={props.id}
			label={props.label ?? 'Name'}
			onChange={props.onChange}
			required={props.required}
			title={props.title}
			type='text'
			value={props.value}
		/>
	);
}
