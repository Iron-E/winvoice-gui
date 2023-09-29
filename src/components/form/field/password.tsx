import type { InputProps } from './props';
import { Input } from '../../form';

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `string`. */
export function InputPassword(props: InputProps<string>): React.ReactElement {
	return (
		<Input
			id={props.id}
			label={props.label ?? 'Password'}
			onChange={props.onChange}
			placeholder={props.placeholder ?? 'Securely generate & store passwords!'}
			required={props.required}
			title={props.title}
			type='password'
			validateIconRight={props.validateIconRight}
			validateIconTop={props.validateIconTop}
			value={props.value}
		/>
	);
}
