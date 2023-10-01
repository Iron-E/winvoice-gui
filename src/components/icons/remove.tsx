import { MinusIcon } from "@heroicons/react/20/solid";
import { ICON } from "../css";

/** A {@link TrashIcon | trash icon} with a 'delete' label.*/
export function RemoveIcon(): React.ReactElement {
	return <>
		<MinusIcon className={ICON} /> Remove
	</>;
}
