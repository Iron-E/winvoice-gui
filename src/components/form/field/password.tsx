import type { InputProps } from './props';
import { Input } from '../../form';

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `string`. */
export function InputPassword(props: InputProps<string>): React.ReactElement {
	return (
		<Input
			id={props.id}
			label={props.label ?? 'Password'}
			onChange={props.onChange}
			placeholder={props.placeholder ?? 'Securely generate and store your passwords!'}
			required={props.required}
			title={props.title}
			type='password'
			value={props.value}
		/>
	);
}
