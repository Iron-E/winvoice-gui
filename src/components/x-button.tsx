import type { Class, Click } from './props-with';
import { XMarkIcon } from '@heroicons/react/20/solid';

export function XButton(props: Click & Class) {
	return (
		<button className={`${props.className} hover:bg-x-bg-hover hover:shadow duration-150 rounded`} onClick={props.onClick}>
			<XMarkIcon />
		</button>
	);
}
