import type { ClassName, Click } from './props-with';
import { XMarkIcon } from '@heroicons/react/20/solid';

export function XButton(props: Click<ClassName>) {
	return (
		<button className={`${props.className} bg-[#ff0000] rounded shadow`} onClick={props.onClick}>
			<XMarkIcon />
		</button>
	);
}
