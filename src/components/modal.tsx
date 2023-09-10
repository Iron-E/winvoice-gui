import * as hooks from '@/hooks';
import React from 'react';
import type { Children, On } from './props-with';
import { Dim } from './dim';
import { XButton } from './buttons/x';

/** properties for a {@link Modal}. */
export type Props = Children & Required<On<'close', [value: null]>>;

/** @return a div which will show above all other content on the page. */
export function Modal(props: Props): React.ReactElement {
	function onClose(): void {
		props.onClose(null);
	}

	hooks.useKeydownHandler({ Escape: true }, onClose);

	return (
		<Dim onClick={onClose}>
			<div className='relative bg-modal-bg rounded-md max-w-full min-h-[1.7rem]' onClick={e => e.stopPropagation()}>
				<XButton className='w-5 mt-1 mr-1 absolute top-0 right-0' onClick={onClose} />
				<div className='my-3 mx-10'>
					{props.children}
				</div>
			</div>
		</Dim>
	);
}
