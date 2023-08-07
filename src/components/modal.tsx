import React from 'react';
import type { Children, Click } from './props-with';
import { Dim } from './dim';
import { XButton } from './x-button';

/** properties for a {@link Modal}. */
export type Props = Children<Click<{}, 'onClose'>>;

/** @return a div which will show above all other content on the page. */
export function Modal(props: Props): React.ReactElement {
	React.useEffect(() => {
		if (props.onClose == undefined) {
			return;
		}

		function close(e: KeyboardEvent): void {
			if (e.key === 'Escape') {
				props.onClose!();
			}
		}

		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, [])

	return (
		<Dim onClick={props.onClose} opacity={0.7}>
			<div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded bg-gray-300'>
				<XButton className='w-5 mt-1 mr-1 absolute top-0 right-0 bg-gray-100' onClick={props.onClose} />
				<div className='m-8'>
					{props.children}
				</div>
			</div>
		</Dim>
	);
}
