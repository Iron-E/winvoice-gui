import React from 'react';

/**
 * @param children additional elements shown inside this one.
 * @param onClose what to do when the user closes the modal.
 * @return a div which will show above all other content on the page.
 */
export function Modal(props: React.PropsWithChildren<{ onClose: (event: KeyboardEvent) => void }>): React.ReactElement {
	React.useEffect(() => {
		function close(e: KeyboardEvent): void {
			if (e.code === 'Escape') {
				props.onClose(e);
			}
		}

		window.addEventListener('keydown', close);
		return () => window.removeEventListener('keydown', close);
	}, [])

	return (
		<div>
		</div>
	);
}
