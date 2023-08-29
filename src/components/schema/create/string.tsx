import type { InputProps } from './props';
import { LabeledInput } from '../../labeled';

/** @return a {@link React.JSX.IntrinsicElements.input | input} to gather a `string`. */
export function InputString(props: InputProps<string>): React.ReactElement {
	return (
		<LabeledInput
			id={props.id}
			inputRef={props.inputRef}
			label={props.label ?? 'Name'}
			onChange={props.onChange}
			required={props.required}
			title={props.title}
			type={props.type}
			value={props.value}
		/>
	);
}
