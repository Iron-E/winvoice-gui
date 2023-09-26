import { PencilIcon } from "@heroicons/react/20/solid";
import { ICON } from "../css";

/** A {@link TrashIcon | trash icon} with a 'delete' label.*/
export function EditIcon(): React.ReactElement {
	return <>
		<PencilIcon className={ICON} /> Edit
	</>;
}
