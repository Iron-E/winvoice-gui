import type { InputProps } from './props';
import type { On } from '../../props-with';
import { FormButton, Input } from '../../form';
import { HOVER, ICON } from '../../css';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid';

/** The style of a {@link React.JSX.IntrinsicElements.button | button}. */
const BUTTON_STYLE = `px-1 py-0.5 mx-0 my-1 text-xs ${HOVER}` as const;

/** @return a {@link React.JSX.IntrinsicElements.input | input} to gather a `string`. */
export function InputId(
	props:
		On<'new', [value: 'new']>
		& On<'search', [value: 'search']>
		& Omit<InputProps<string>, 'children' | 'disabled'>,
): React.ReactElement {
	return (
		<Input
			disabled={true}
			id={props.id}
			label={props.label ?? 'ID'}
			onChange={props.onChange}
			required={props.required}
			title={props.title}
			type='text'
			value={props.value}
		>
			<FormButton className={BUTTON_STYLE} onClick={e => {
				e.preventDefault();
				props.onNew?.('new');
			}}>
				<PlusIcon className={ICON} /> New
			</FormButton>

			<FormButton className={BUTTON_STYLE} onClick={e => {
				e.preventDefault();
				props.onSearch?.('search');
			}}>
				<MagnifyingGlassIcon className={ICON} /> Search
			</FormButton>
		</Input>
	);
}
