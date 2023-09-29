import type { InputProps } from './props';
import { Input } from '../../form';

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `string`. */
export function InputString(props: InputProps<string>): React.ReactElement {
	return (
		<Input
			id={props.id}
			label={props.label ?? 'Name'}
			onChange={props.onChange}
			placeholder={props.placeholder ?? 'John Doe'}
			required={props.required}
			title={props.title}
			type='text'
			validateIconRight={props.validateIconRight}
			validateIconTop={props.validateIconTop}
			value={props.value}
		/>
	);
}
