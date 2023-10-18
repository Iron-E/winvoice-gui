import React from 'react';
import type { CompositeProps } from '../props';
import type { Fn, Maybe, Opt, ValueOf } from "@/utils";
import type { Id as IdProp, On } from "@/components/props-with";
import type { Id } from '@/schema';
import { AddIcon, RemoveIcon } from '../../../icons';
import { BorderLabeledField } from '../border-labeled';
import { FormButton, LABEL_BUTTON_STYLE } from '../../../form/button';
import { InputId } from '../id';
import { Modal } from "@/components";
import { useModalVisibility } from "@/hooks";

/** A function which can handle ID events. */
export type IdEventsHandler<T> = (id: ValueOf<IdProp, 'id'>, onChange: Fn<[value: T]>) => [
	Opt<React.ReactElement>,
	ReturnType<typeof useModalVisibility<'new' | 'search'>>[1],
];

/** A form which is used to {@link IdEventsHandler | handle ID events} */
export type IdEventsHandlerForm<T> = (props: On<'submit', [value: T]> & IdProp) => React.ReactElement;

/** @returns a tuple which first contains the handler for the given {@link InputID} action, and second, a setter for the current ID action. */
export function useIdEventHandlers<T>(
	id: Parameters<IdEventsHandler<T>>[0],
	onChange: Parameters<IdEventsHandler<T>>[1],
	NewForm: IdEventsHandlerForm<T>,
): ReturnType<IdEventsHandler<T>> {
	const [MODAL_VISIBLE, setModalVisible] = useModalVisibility();
	return [
		MODAL_VISIBLE && (MODAL_VISIBLE === 'new'
			? <Modal onClose={setModalVisible}>
				<NewForm
					id={id}
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

type IdsProps<T> = CompositeProps<Maybe<T>[]>;

/** @returns a {@link React.JSX.IntrinsicElements.input | input} to gather a `string`. */
export function useIdInputs<T extends { id: Id }>(props: Omit<IdsProps<T>, 'value'> & {
	useIdEventHandlers: (id: string, setValue: Parameters<IdEventsHandler<T>>[1]) => ReturnType<IdEventsHandler<T>>,
	values: NonNullable<IdsProps<T>['value']>,
}): [Opt<React.ReactElement>, React.ReactElement] {
	const [INDEX, setIndex] = React.useState(-1);
	const [HANDLER, setIdEvent] = props.useIdEventHandlers(props.id, d => {
		props.onChange(props.values.with(INDEX, d));
		setIndex(-1);
	});

	return [
		HANDLER,
		<BorderLabeledField
			button={{ onClick: () => props.onChange([...props.values, undefined]), text: <AddIcon /> }}
			className='min-w-[39ch] w-full'
			key={1}
			label={props.label}
		>
			{props.values.map((d, i) => (
				<InputId
					id={`${props.id}-${i + 1}`}
					key={d?.id ?? i}
					label={`${i + 1}.`}
					onAction={action => {
						setIndex(i);
						setIdEvent(action);
					}}
					required={true}
					title='A department assigned to this Job'
					value={d?.id ?? ''}
				>
					<FormButton className={LABEL_BUTTON_STYLE} onClick={() => props.onChange(props.values.toSpliced(i, 1))}>
						<RemoveIcon />
					</FormButton>
				</InputId>
			))}
		</BorderLabeledField>,
	];
}
