import type { Children, On } from '../../props-with';
import type { Fn, Opt } from '@/utils';
import type { InputProps } from './props';
import { FormButton, Input, LABEL_BUTTON_STYLE } from '../../form';
import { Modal } from '@/components';
import { useModalVisibility } from '@/hooks';
import { NewIcon } from '@/components/icons';
import { SearchIcon } from '@/components/icons/search';

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
			validateIconRight={props.validateIconRight}
			validateIconTop={props.validateIconTop}
			value={props.value}
		>
			{props.children}

			<FormButton className={LABEL_BUTTON_STYLE} onClick={props.onAction && (() => props.onAction!('new'))}>
				<NewIcon />
			</FormButton>

			<FormButton className={LABEL_BUTTON_STYLE} onClick={props.onAction && (() => props.onAction!('search'))}>
				<SearchIcon />
			</FormButton>
		</Input>
	);
}
