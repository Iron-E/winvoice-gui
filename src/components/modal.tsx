import React from 'react';
import type { Children, On } from './props-with';
import { Dim } from './dim';
import { XButton } from './x-button';
import * as hooks from '../hooks';

/** properties for a {@link Modal}. */
export type Props = Children & Required<On<'close'>>;

/** @return a div which will show above all other content on the page. */
export function Modal(props: Props): React.ReactElement {
	hooks.useKeydownHandler({ Escape: true }, props.onClose);

	return (
		<Dim onClick={props.onClose}>
			<div
				className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-modal-bg rounded'
				onClick={e => e.stopPropagation()}
			>
				<XButton className='w-5 mt-1 mr-1 absolute top-0 right-0' onClick={props.onClose} />
				<div className='my-3 mx-10'>
					{props.children}
				</div>
			</div>
		</Dim>
	);
}
