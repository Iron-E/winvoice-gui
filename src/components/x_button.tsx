import { XMarkIcon } from "@heroicons/react/20/solid";

export function XButton(props: {className?: string, onClick?: React.MouseEventHandler<HTMLButtonElement>}) {
	return (
		<button className={`${props.className} rounded`} onClick={props.onClick}>
			<XMarkIcon />
		</button>
	);
}
