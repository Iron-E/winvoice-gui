import * as props_with from "./props-with";
import { XMarkIcon } from "@heroicons/react/20/solid";

export function XButton(props: props_with.Click<props_with.ClassName>) {
	return (
		<button className={`${props.className} rounded`} onClick={props.onClick}>
			<XMarkIcon />
		</button>
	);
}
