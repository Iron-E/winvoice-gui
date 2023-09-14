import type { InputProps } from './props';
import type { On } from '../../props-with';
import type { Fn, Opt } from '@/utils';
import { FormButton, Input } from '../../form';
import { HOVER, ICON } from '../../css';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/20/solid';
import { useModalVisibility } from '@/hooks';
import { Modal } from '@/components';

/** The style of a {@link React.JSX.IntrinsicElements.button | button}. */
const BUTTON_STYLE = `px-1 py-0.5 mx-0 my-1 text-xs ${HOVER}` as const;

/** @returns a tuple which first contains the handler for the given {@link InputID} action, and second, a setter for the current ID action. */
export function useIdEventHandlers<T>(
	onChange: Fn<[value: T]>,
	NewForm: (props: On<'submit', [value: T]>) => React.ReactElement,
): [Opt<React.ReactElement>, ReturnType<typeof useModalVisibility<'new' | 'search'>>[1]] {
	const [MODAL_VISIBLE, setModalVisible] = useModalVisibility();
	return [
		MODAL_VISIBLE && (MODAL_VISIBLE === 'new'
			? <Modal onClose={setModalVisible}>
				<NewForm
					onSubmit={l => {
						onChange(l);
						setModalVisible(null);
					}}
				/>
			</Modal>
			: <Modal onClose={setModalVisible}>
				Unimplemented: allow searching for a location and choosing one
			</Modal>
		),
		setModalVisible,
	];
}

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `string`. */
export function InputId(props:
	& On<'new', [value: 'new']>
	& On<'search', [value: 'search']>
	& Omit<InputProps<string>, 'children' | 'disabled'>,
): React.ReactElement {
	return (
		<Input
			id={props.id}
			inputClassName='min-w-[36ch]'
			label={props.label ?? 'ID'}
			onChange={props.onChange}
			readOnly={true}
			required={props.required}
			title={props.title}
			type='text'
			value={props.value}
		>
			<FormButton className={BUTTON_STYLE} onClick={props.onNew && (() => props.onNew!('new'))}>
				<PlusIcon className={ICON} /> New
			</FormButton>

			<FormButton className={BUTTON_STYLE} onClick={props.onSearch && (() => props.onSearch!('search'))}>
				<MagnifyingGlassIcon className={ICON} /> Search
			</FormButton>
		</Input>
	);
}
