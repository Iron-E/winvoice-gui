import React from 'react';
import type { CompositeProps } from '../props';
import type { Fn, Maybe, Opt } from "@/utils";
import type { Id } from '@/schema';
import type { On } from "@/components/props-with";
import { BorderLabeledField } from '../border-labeled';
import { FormButton, LABEL_BUTTON_STYLE } from '../../../form';
import { InputId } from '../../field';
import { Modal } from "@/components";
import { NewIcon, RemoveIcon } from '../../../icons';
import { useModalVisibility } from "@/hooks";


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

type IdEventsHandler<T> = typeof useIdEventHandlers<T>;
type IdsProps<T> = CompositeProps<Maybe<T>[]>;

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `string`. */
export function useIdInputs<T extends { id: Id }>(props:
	& Omit<IdsProps<T>, 'value'>
	& {
		useIdEventHandlers: (id: string, setValue: Parameters<IdEventsHandler<T>>[0]) => ReturnType<IdEventsHandler<T>>,
		values: NonNullable<IdsProps<T>['value']>,
	}
): [Opt<React.ReactElement>, React.ReactElement] {
	const [INDEX, setIndex] = React.useState(-1);
	const [HANDLER, setIdEvent] = props.useIdEventHandlers(props.id, d => {
		props.onChange(props.values.map((v, i) => i === INDEX ? d : v));
		setIndex(-1);
	});

	return [
		HANDLER,
		<BorderLabeledField
			button={{ onClick: () => props.onChange([...props.values, undefined]), text: <NewIcon>Add</NewIcon> }}
			className='min-w-[39ch] w-full'
			key={1}
			label={props.label}
		>
			{props.values.map((d, i) => (
				<div className='my-2' key={d?.id ?? i}>
					<InputId
						id={`${props.id}-${i + 1}`}
						label={`${i + 1}.`}
						onAction={action => {
							setIndex(i);
							setIdEvent(action);
						}}
						required={true}
						title='A department assigned to this Job'
						validateIconRight='right-4'
						validateIconTop='top-[-0.05rem]'
						value={d?.id ?? ''}
					>
						<FormButton
							className={LABEL_BUTTON_STYLE}
							onClick={() => props.onChange(props.values.filter((_, j) => j !== i))}
						>
							<RemoveIcon />
						</FormButton>
					</InputId>
				</div>
			))}
		</BorderLabeledField>,
	];
}
