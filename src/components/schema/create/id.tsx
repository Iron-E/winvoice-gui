import type { InputProps } from './props';
import type { On } from '../../props-with';
import type { Props } from '@/utils';
import { FormButton, Input } from '../../form';
import { HOVER, ICON } from '../../css';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid';

/** The style of a {@link React.JSX.IntrinsicElements.button | button}. */
const BUTTON_STYLE = `px-1 py-0.5 mx-0 my-1 text-xs ${HOVER}` as const;

type FormButtonClickHandler = Required<Props<typeof FormButton>>['onClick'];

/** @return a {@link React.JSX.IntrinsicElements.input | input} to gather a `string`. */
export function InputId(
	props:
		Partial<On<'new' | 'search', Parameters<FormButtonClickHandler>, ReturnType<FormButtonClickHandler>>>
		& Omit<InputProps<string>, 'children' | 'disabled'>,
): React.ReactElement {
	return (
		<Input
			disabled={true}
			id={props.id}
			inputRef={props.inputRef}
			label={props.label ?? 'Id'}
			onChange={props.onChange}
			required={props.required}
			title={props.title}
			type={props.type}
			value={props.value}
		>
			<FormButton className={BUTTON_STYLE} onClick={e => {
				e.preventDefault();
				props.onNew?.(e);
			}}>
				<PlusIcon className={ICON} /> New
			</FormButton>

			<FormButton className={BUTTON_STYLE} onClick={e => {
				e.preventDefault();
				props.onSearch?.(e);
			}}>
				<MagnifyingGlassIcon className={ICON} /> Search
			</FormButton>
		</Input>
	);
}
