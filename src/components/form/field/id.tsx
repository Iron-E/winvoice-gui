import type { Children, On } from '../../props-with';
import type { InputProps } from './props';
import { FormButton, Input, LABEL_BUTTON_STYLE } from '../../form';
import { NewIcon } from '@/components/icons';
import { SearchIcon } from '@/components/icons/search';

export * from './id/hooks';

/**
 * HACK: next.js complains that this component cannot be written to, while `readOnly` is not set.
 *       however, setting `readOnly` disables the posibility of adding `required`. and linking with
 *       foreign keys is *often* `required`. Thus, this design is intentional, and this empty function
 *       shuts next.js up
 */
function doNothing(): void { }

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `string`. */
export function InputId(props:
	& Children
	& Omit<InputProps<string>, 'onChange'>
	& On<'action', [value: 'new' | 'search']>
): React.ReactElement {
	return (
		<Input
			id={props.id}
			inputClassName='min-w-[36ch] bg-form-field-bg-readonly'
			label={props.label ?? 'ID'}
			onChange={doNothing}
			required={props.required}
			title={props.title}
			type='text'
			value={props.value}
		>
			<FormButton className={LABEL_BUTTON_STYLE} onClick={props.onAction && (() => props.onAction!('new'))}>
				<NewIcon />
			</FormButton>

			<FormButton className={LABEL_BUTTON_STYLE} onClick={props.onAction && (() => props.onAction!('search'))}>
				<SearchIcon />
			</FormButton>

			{props.children}
		</Input>
	);
}
