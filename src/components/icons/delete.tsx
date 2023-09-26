import { TrashIcon } from "@heroicons/react/20/solid";
import { ICON } from "../css";

/** A {@link TrashIcon | trash icon} with a 'delete' label.*/
export function DeleteIcon(): React.ReactElement {
	return <>
		<TrashIcon className={ICON} /> Delete
	</>;
}
