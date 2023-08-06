import React from 'react';
import { Dim } from './dim';
import { XButton } from './x-button';

export type HandleClose = () => void;

/** properties for a {@link Modal}. */
export type Props = React.PropsWithChildren<{
	/** what to do when the user closes the modal. */
	onClose: HandleClose,
}>;

/** @return a div which will show above all other content on the page. */
export function Modal(props: Props): React.ReactElement {
	React.useEffect(() => {
		function close(e: KeyboardEvent): void {
			if (e.key === 'Escape') {
				props.onClose();
			}
		}

		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, [])

	return (
		<Dim onClick={props.onClose} opacity={50}>
			<div className='fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded bg-gray-300 z-1' onClick={() => props.onClose()}>
				<XButton className='w-5 mt-1 mr-1 absolute top-0 right-0 bg-gray-100' onClick={props.onClose} />
				<div className='m-8'>
					{props.children}
				</div>
			</div>
		</Dim>
	);
}
