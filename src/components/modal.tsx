import * as hooks from '@/hooks';
import React from 'react';
import type { Children, On } from './props-with';
import { Dim } from './dim';
import { XButton } from './buttons/x';
import { FormButton } from './form';
import { SPACE } from './css';

type OnClose = Required<On<'close', [value: null]>>;

/** @returns a div which will show above all other content on the page. */
export function Modal(props: Children & OnClose): React.ReactElement {
	function onClose(): void {
		props.onClose(null);
	}

	hooks.useKeydownHandler({ Escape: true }, onClose);

	return (
		<Dim onClick={onClose}>
			<div className='relative bg-modal-bg rounded-md max-w-full min-h-[1.7rem]' onClick={e => e.stopPropagation()}>
				<XButton className='w-5 mt-1 mr-1 absolute top-0 right-0' onClick={onClose} />
				<div className='my-3 mx-10 flex flex-col'>
					{props.children}
				</div>
			</div>
		</Dim>
	);
}

/** @returns a modal to confirm some `message`. */
export function ConfirmModal(props:
	& OnClose
	& Required<On<'confirm'>>
	& {message: React.ReactElement},
): React.ReactElement {
	return (
		<Modal onClose={props.onClose}>
			<p>Please confirm that {props.message}.</p>
			<FormButton className={SPACE} onClick={async () => {
				await Promise.resolve(props.onConfirm());
				props.onClose(null);
			}}>
				Confirm
			</FormButton>
		</Modal>
	);
}
