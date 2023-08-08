import React from 'react';

/**
 * {@link window.addEventListener | Listens} to the `keydown` event for any of the provided `keys` to be pressed, at
 * which point the `onKeyPressed` function will be called.
 *
 * @param keys the keys to listen for
 * @param onKeyPressed what to do when a matching key is pressed.
 */
export function useKeydownHandler(keys: {[index: string]: true}, onKeyPressed?: () => void): void {
	React.useEffect(() => {
		if (onKeyPressed == undefined) {
			return;
		}

		function handleKeydown(e: KeyboardEvent): void {
			if (keys[e.key]) {
				onKeyPressed!()
			}
		}

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	}, [])
}
