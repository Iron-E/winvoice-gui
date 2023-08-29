import { HOVER } from '../css';
import type { Class, Click } from '../props-with';
import { XMarkIcon } from '@heroicons/react/20/solid';

/** @return a button which indicates that it can be clicked to "dismiss" a given element. */
export function XButton(props: Click & Class) {
	return (
		<button className={`${props.className} hover:bg-x-bg-hover ${HOVER}`} onClick={props.onClick} aria-label='dismiss'>
			<XMarkIcon />
		</button>
	);
}
